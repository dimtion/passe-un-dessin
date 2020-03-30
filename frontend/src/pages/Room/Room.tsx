import React, { useEffect } from 'react';
import { RoomContainer } from './Room.style';
import { RootState } from 'redux/types';
import { useSelector, useDispatch } from 'react-redux';
import { useFetchRoom, useJoinRoom } from 'redux/Room/hooks';
import { useParams } from 'react-router';
import { addPlayerToRoom } from 'redux/Room';
import { MIN_PLAYERS, MAX_PLAYERS } from 'redux/Game/constants';
import { useStartGame } from 'redux/Game/hooks';
import {
  useServerSentEvent,
  SERVER_EVENT_TYPES,
  NewPlayerEventDataType,
} from 'services/networking/server-events';

const Room: React.FunctionComponent = () => {
  const { roomId } = useParams();
  const [, doFetchRoom] = useFetchRoom();
  const [, doJoinRoom] = useJoinRoom();
  const [, doStartGame] = useStartGame();
  const room = useSelector((state: RootState) => state.room.room);
  const player = useSelector((state: RootState) => state.player.player);
  const dispatch = useDispatch();

  useEffect(() => {
    doFetchRoom(roomId);
  }, [doFetchRoom, roomId]);

  useEffect(() => {
    if (room && player && !room.players.some(roomPlayer => roomPlayer.uuid === player.uuid)) {
      doJoinRoom(room.uuid);
    }
  }, [room, player, doJoinRoom]);

  useServerSentEvent<NewPlayerEventDataType>(
    `room-${room?.uuid}`,
    SERVER_EVENT_TYPES.PLAYER_CONNECTED,
    data => {
      dispatch(addPlayerToRoom(data.player));
    },
  );

  if (!room) return null;
  if (!player) return null;

  const goodNumberOfPlayers =
    room.players.length >= MIN_PLAYERS && room.players.length <= MAX_PLAYERS;

  const isPlayerAdmin = player.uuid === room.admin.uuid;

  return (
    <RoomContainer>
      <p>Bienvenue sur la room {room.uuid} !</p>
      <p>Joueurs :</p>
      <ul>
        {room.players.map(player => (
          <li key={player.uuid}>{player.name}</li>
        ))}
      </ul>
      {goodNumberOfPlayers && isPlayerAdmin && (
        <button onClick={() => doStartGame(room.uuid)}>Start Game</button>
      )}
    </RoomContainer>
  );
};

export default Room;
