# Generated by Django 3.2.9 on 2021-11-05 23:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('facturacion', '0008_rename_cliente_factura_id_cliente'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedido',
            name='cantidad',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='pedido',
            name='total',
            field=models.FloatField(default=0),
        ),
    ]
