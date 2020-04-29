# Generated by Django 3.0.5 on 2020-04-27 20:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0017_auto_20200422_2048'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='game',
            options={'get_latest_by': 'created_at'},
        ),
        migrations.AlterModelOptions(
            name='pad',
            options={'get_latest_by': 'created_at'},
        ),
        migrations.AlterModelOptions(
            name='padstep',
            options={'get_latest_by': 'created_at'},
        ),
        migrations.AlterModelOptions(
            name='player',
            options={'get_latest_by': 'created_at'},
        ),
        migrations.AlterModelOptions(
            name='room',
            options={'get_latest_by': 'created_at'},
        ),
        migrations.AlterModelOptions(
            name='vote',
            options={'get_latest_by': 'created_at'},
        ),
        migrations.AlterField(
            model_name='padstep',
            name='player',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='steps', to='core.Player'),
        ),
    ]