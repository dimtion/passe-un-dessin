# Generated by Django 3.0.4 on 2020-03-28 22:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_auto_20200328_2210'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='phase',
            field=models.CharField(choices=[('INIT', 'INIT'), ('ROUNDS', 'ROUNDS'), ('DEBRIEF', 'DEBRIEF')], default='INIT', max_length=10),
        ),
        migrations.AlterField(
            model_name='padstep',
            name='step_type',
            field=models.CharField(choices=[('WORD_TO_DRAWING', 'WORD_TO_DRAWING'), ('DRAWING_TO_WORD', 'DRAWING_TO_WORD')], max_length=50),
        ),
    ]
