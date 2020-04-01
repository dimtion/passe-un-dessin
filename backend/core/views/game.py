
import json

from django.db import transaction
from django.http import HttpResponseBadRequest, JsonResponse
from rest_framework.generics import RetrieveAPIView

from core.models import Game, Pad, PadStep
from core.serializers import GameSerializer, PadSerializer, PadStepSerializer
from core.service.game_service import all_pads_initialized, switch_to_rounds


class GameRetrieveAPIView(RetrieveAPIView):
    lookup_field = "uuid"
    queryset = Game.objects.prefetch_related(
        'players', 'pads', 'pads__initial_player', 'pads__steps', 'pads__steps__player'
    ).all()
    serializer_class = GameSerializer


class PadRetrieveAPIView(RetrieveAPIView):
    lookup_field = "uuid"
    queryset = Pad.objects.prefetch_related('initial_player', 'steps', 'steps__player').all()
    serializer_class = PadSerializer


class PadStepRetrieveAPIView(RetrieveAPIView):
    lookup_field = "uuid"
    queryset = PadStep.objects.prefetch_related('player').all()
    serializer_class = PadStepSerializer


def save_pad(request, uuid):
    if request.method != "PUT":
        return HttpResponseBadRequest("PUT expected")

    json_body = json.loads(request.body)

    try:
        sentence = json_body["sentence"]
        pad = Pad.objects.get(uuid=uuid)
        pad.sentence = sentence

        with transaction.atomic():
            pad.save()
            game = pad.game

            if all_pads_initialized(pad.game):
                switch_to_rounds(game)

            return JsonResponse(PadSerializer(pad).data)
    except Pad.DoesNotExist:
        return HttpResponseBadRequest("Pad with uuid %s does not exist" % uuid)
    except KeyError:
        return HttpResponseBadRequest("Provide sentence!")


def save_step(request, uuid):
    if request.method != "PUT":
        return HttpResponseBadRequest("PUT expected")

    json_body = json.loads(request.body)

    try:
        step = PadStep.objects.get(uuid=uuid)
    except PadStep.DoesNotExist:
        return HttpResponseBadRequest("Pad step with uuid %s does not exist" % uuid)

    try:
        sentence = json_body["sentence"]
        step.sentence = sentence
        step.save()
    except KeyError:
        try:
            drawing = json_body["drawing"]
            step.drawing = drawing
            step.save()
        except KeyError:
            return HttpResponseBadRequest("Provide either sentence or drawing!")

    return JsonResponse(PadStepSerializer(step).data)