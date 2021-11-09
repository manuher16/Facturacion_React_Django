from django.db import models
from django.db import models
from django import forms
# Create your models here.


class Cliente(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    direccion = models.CharField(max_length=50)
    telefono = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True)
    identidad = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return self.nombre + " " + self.apellido

    def json(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'direccion': self.direccion,
            'telefono': self.telefono,
            'email': self.email,
            'identidad': self.identidad
        }


class Impuesto(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    porcentaje = models.FloatField()
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre + " " + str(self.porcentaje*100) + "%"

    def json(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'porcentaje': self.porcentaje,
            'createdAt': self.createdAt
        }


class Producto(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    precio = models.FloatField()
    cantidad = models.IntegerField()
    createdAt = models.DateTimeField(auto_now_add=True)
    impuesto = models.ForeignKey(Impuesto, on_delete=models.CASCADE, default=2)

    def __str__(self):
        return self.nombre

    def json(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'precio': self.precio,
            'cantidad': self.cantidad,
            'impuesto': self.impuesto.json(),
            'createdAt': self.createdAt
        }


class Descuento(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    porcentaje = models.FloatField()
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre + " " + str(self.porcentaje*100) + "%"

    def json(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'porcentaje': self.porcentaje,
            'createdAt': self.createdAt
        }


class Factura(models.Model):

    Pendiente = 'PE'
    Pagada = 'PA'
    Anulada = 'AN'
    CHOICE_Status = (
        (Pendiente, 'Pendiente'),
        (Pagada, 'Pagada'),
        (Anulada, 'Anulada'),
    )
    estado = models.CharField(
        max_length=2, choices=CHOICE_Status, default=Pendiente)
    id_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    id_impuesto = models.ForeignKey(
        Impuesto, on_delete=models.CASCADE, default=2)
    id_descuento = models.ForeignKey(
        Descuento, on_delete=models.CASCADE, default=1)
    subtotal = models.FloatField(default=0)
    total = models.FloatField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Factura " + str(self.id_cliente)

    def json(self):
        return {
            'id': self.id,
            'estado': self.estado,
            'cliente': self.id_cliente.json(),
            'impuesto': self.id_impuesto.json(),
            'descuento': self.id_descuento.json(),
            'subtotal': self.subtotal,
            'total': self.total,
            'createdAt': self.createdAt
        }


class Pedido(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.FloatField()
    total = models.FloatField(default=0)
    id_factura = models.ForeignKey(Factura, on_delete=models.CASCADE)

    def __str__(self):
        return "Pedido " + str(self.cliente)

    def json(self):
        return {
            'id': self.id,
            'cliente': self.cliente.json(),
            'producto': self.producto.json(),
            'cantidad': self.cantidad,
            'total': self.producto.precio * self.cantidad,
            'factura': self.id_factura.json()
        }
