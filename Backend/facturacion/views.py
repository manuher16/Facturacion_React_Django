from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Cliente
from django.db.models import Sum, Count
from .models import Factura
from .models import Pedido
from .models import Producto
from .models import Impuesto
from .models import Descuento
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import json


@csrf_exempt
def createClient(req):
    if req.method == 'POST':
        try:
            data = json.loads(req.body)

            tempClient = Cliente(nombre=data['nombre'],
                                 apellido=data['apellido'],
                                 identidad=data["identidad"],
                                 direccion=data['direccion'],
                                 telefono=data['telefono'],
                                 email=data['email'])
            tempClient.save()
            return JsonResponse({'status': True})
        except Exception as e:
            print(e)
            return JsonResponse({'status': False})


@csrf_exempt
def deleteClient(req, id):
    if req.method == 'DELETE':
        try:
            cliente = Cliente.objects.get(id=id)
            cliente.delete()
            return JsonResponse({'status': True})
        except Exception as e:
            print(e)
            return JsonResponse({'status': False})
    else:
        return JsonResponse({'ERROR': 'Delete User'})


@csrf_exempt
def updateClient(req, id):
    if req.method == 'PATCH':
        try:
            data = json.loads(req.body)
            cliente = Cliente.objects.get(id=id)
            cliente.nombre = data['nombre']
            cliente.apellido = data['apellido']
            cliente.identidad = data['identidad']
            cliente.direccion = data['direccion']
            cliente.telefono = data['telefono']
            cliente.email = data['email']
            cliente.save()
            return JsonResponse({'status': True})
        except Exception as e:
            print(e)
            return JsonResponse({'status': False})
    else:
        return JsonResponse({'ERROR': 'Update User'})


def getIdClient(req, id):
    if req.method == 'GET':

        resClientes = Cliente.objects.get(id=id)
        return JsonResponse({'Cliente': {
            "id": resClientes.id,
            "nombres": resClientes.nombre,
            "apellidos": resClientes.apellido,
            "identidad": resClientes.identidad,
            "direccion": resClientes.direccion,
            "telefono": resClientes.telefono,
            "email": resClientes.email

        }})
    else:
        return JsonResponse({'ERROR': 'Get All Users'})


def getAllClient(req):
    if req.method == 'GET':
        resClientes = Cliente.objects.all().values()
        clientes = []

        for cliente in resClientes:
            clientes.append(cliente)

        return JsonResponse({'Clientes': clientes})
    else:
        return JsonResponse({'ERROR': 'Get All Users'})


@csrf_exempt
def createFactura(req):
    if req.method == 'POST':
        try:
            data = json.loads(req.body)
            if Factura.objects.filter(id_cliente=data['id_cliente'], estado="PE").exists():
                factura = Factura.objects.filter(
                    id_cliente=data['id_cliente'], estado="PE")
                pedidos = Pedido.objects.filter(id_factura=factura[0].id)
                resPedidos = []
                for pedido in pedidos:
                    resPedidos.append(pedido.json())
                return JsonResponse({'status': True, "message": "Ya existe una factura pendiente", "factura": factura[0].json(), "pedidos": resPedidos})
            else:
                tempFactura = Factura()
                tempFactura.id_cliente = Cliente.objects.get(
                    id=data['id_cliente'])
                tempFactura.save()
                return JsonResponse({'status': True, "factura": tempFactura.json(), "pedidos": []})
        except Exception as e:
            print(e)
            return JsonResponse({'status': False})


@csrf_exempt
def updateEstadoFactura(req, id):
    if req.method == 'PATCH':
        try:
            data = json.loads(req.body)
            factura = Factura.objects.get(id=id)
            pedidos = Pedido.objects.filter(id_factura=factura.id)
            impuestos = 0
            subtotal = 0
            descuento = 0
            print(pedidos)
            tempFactura = factura.json()

            for pedido in pedidos:
                print(pedido)
                subtotal += pedido.producto.precio * pedido.cantidad
                impuestos += pedido.producto.impuesto.porcentaje * \
                    (pedido.producto.precio*pedido.cantidad)
            descuento = tempFactura['descuento']['porcentaje']*subtotal
            print(descuento)
            factura.impuestos = impuestos
            factura.estado = data['estado']
            factura.subtotal = subtotal
            factura.total = subtotal + impuestos-descuento
            tempFactura = factura.json()
            print(subtotal,   factura.total)

            factura.save()
            return JsonResponse({'status': True, "factura": factura.json()})
        except Exception as e:
            print(e)
            return JsonResponse({'status': False})
    else:
        return JsonResponse({'ERROR': 'Update User'})


def getFactura(req, id):
    try:
        resFactura = Factura.objects.get(id=id)
        return JsonResponse({'Factura': {
            "id": resFactura.id,
            "id_cliente": resFactura.id_cliente.id,
            "estado": resFactura.estado
        }})
    except Exception as e:
        print(e)
        return JsonResponse({'ERROR': True})


def getFacturaIdCliente(req, id):
    try:
        resFactura = Factura.objects.filter(id_cliente=id)

        facturas = []
        for factura in resFactura:
            facturas.append(factura.json())
        pedidos = Pedido.objects.filter(id_factura=id)
        print(pedidos)
        return JsonResponse({'Facturas': facturas})
    except Exception as e:
        print(e)
        return JsonResponse({'ERROR': True})


@csrf_exempt
def createPedidoFactura(req):
    if req.method == 'POST':
        try:
            data = json.loads(req.body)
            producto = Producto.objects.get(id=data['id_producto'])
            cliente = Cliente.objects.get(id=data['id_cliente'])
            factura = Factura.objects.get(id=data['id_factura'])
            if(producto.cantidad < data['cantidad']):
                return JsonResponse({'status': False, "message": "No hay suficiente producto"})
            else:
                if(Pedido.objects.filter(producto=producto.id, id_factura=factura.id).exists()):
                    pedido = Pedido.objects.get(
                        producto=producto.id, id_factura=factura.id)

                    pedido.cantidad = pedido.cantidad+data['cantidad']
                    pedido.total = producto.precio*pedido.cantidad
                    pedido.save()
                    pedidos = Pedido.objects.filter(
                        id_factura=data['id_factura'])
                    resPedidos = []
                    for tempPedido in pedidos:
                        resPedidos.append(tempPedido.json())
                    return JsonResponse({'status': True, "message": "Agrego cantidad pedido", "pedidos": resPedidos})
                tempPedido = Pedido(producto=producto,
                                    cliente=cliente,
                                    id_factura=factura,
                                    cantidad=data['cantidad'],
                                    total=producto.precio * data['cantidad'])
                tempPedido.save()
                pedidos = Pedido.objects.filter(id_factura=data['id_factura'])
                resPedidos = []
                for tempPedido in pedidos:
                    resPedidos.append(tempPedido.json())

                return JsonResponse({'status': True, "message": "Ha creado un pedido", "pedidos": resPedidos})

        except Exception as e:
            print(e)
            return JsonResponse({'status': False})
    else:
        return JsonResponse({'ERROR': 'Update User'})


@csrf_exempt
def getPedidoIdFactura(req, id):
    if req.method == 'GET':
        try:

            resPedido = Pedido.objects.filter(id_factura=id)

            pedidos = []
            for pedido in resPedido:
                pedidos.append(pedido.json())

            return JsonResponse({'Pedidos': pedidos})
        except Exception as e:
            print(e)
            return JsonResponse({'ERROR': True})
    else:
        return JsonResponse({'ERROR': True})


@csrf_exempt
def deletePedidoId(req, id):
    if req.method == 'DELETE':
        try:
            resPedido = Pedido.objects.get(id=id)
            resPedido.delete()
            pedidos = Pedido.objects.filter(id_factura=resPedido.id_factura.id)
            resPedidos = []
            for tempPedido in pedidos:
                resPedidos.append(tempPedido.json())
            return JsonResponse({'status': True, "message": "Se elimino el pedido", "pedidos": resPedidos})
        except Exception as e:
            print(e)
            return JsonResponse({'status': False, "message": "No se pudo encontrar"})
    else:
        return JsonResponse({'ERROR': True})


@csrf_exempt
def getAllProducts(req):
    if req.method == 'GET':
        resProductos = Producto.objects.all().values()
        productos = []

        for producto in resProductos:
            productos.append(producto)

        return JsonResponse({'Productos': productos})
    else:
        return JsonResponse({'ERROR': 'Get All Users'})


def getAllImpuestos(req):
    if req.method == 'GET':
        resImpuestos = Impuesto.objects.all().values()
        impuestos = []

        for impuesto in resImpuestos:
            impuestos.append(impuesto)

        return JsonResponse({'Impuestos': impuestos})
    else:
        return JsonResponse({'ERROR': 'Get All Users'})


def getAllDescuentos(req):
    if req.method == 'GET':
        resDescuentos = Descuento.objects.all().values()
        descuentos = []

        for descuento in resDescuentos:
            descuentos.append(descuento)

        return JsonResponse({'Descuentos': descuentos})
    else:
        return JsonResponse({'ERROR': 'Get All Users'})


@csrf_exempt
def changeImpuestoIdFactura(req, id):
    if req.method == 'POST':
        try:
            data = json.loads(req.body)
            factura = Factura.objects.get(id=id)
            impuesto = Impuesto.objects.get(id=data['id_impuesto'])
            factura.id_impuesto = impuesto
            factura.save()
            return JsonResponse({'status': True, "factura": factura.json()})
        except Exception as e:
            print(e)
            return JsonResponse({'status': False})
    else:
        return JsonResponse({'ERROR': 'Error'})


@csrf_exempt
def changeDescuentoIdFactura(req, id):
    if req.method == 'PATCH':
        try:
            data = json.loads(req.body)
            factura = Factura.objects.get(id=id)
            descuento = Descuento.objects.get(id=data['id_descuento'])

            factura.id_descuento = descuento
            factura.save()
            tempfactura = factura.json()

            return JsonResponse({'status': True, "factura": tempfactura})
        except Exception as e:
            print(e)
            return JsonResponse({'status': False})


@csrf_exempt
def setCantidadIdPedido(req, id):
    if req.method == 'PATCH':
        try:
            data = json.loads(req.body)
            pedido = Pedido.objects.get(id=id)
            pedido.cantidad = data['cantidad']
            pedido.total = pedido.producto.precio * pedido.cantidad
            pedido.save()
            return JsonResponse({'status': True, "pedido": pedido.json()})
        except Exception as e:
            print(e)
            return JsonResponse({'status': False})
    else:
        return JsonResponse({'ERROR': 'Error'})


@csrf_exempt
def getAllFacturas(req):
    if req.method == 'GET':
        resFacturas = Factura.objects.filter().order_by('-createdAt')
        facturas = []
        for factura in resFacturas:
            pedidos = Pedido.objects.filter(id_factura=factura.id)
            impuesto = 0
            for pedido in pedidos:
                impuesto += (pedido.producto.precio * pedido.cantidad) * \
                    pedido.producto.impuesto.porcentaje
            tempFactura = factura.json()
            tempFactura['impuestos'] = impuesto
            facturas.append(tempFactura)

        return JsonResponse({'Facturas': facturas})
    else:
        return JsonResponse({'ERROR': 'Get All Users'})


def getTotales(req):
    if req.method == 'GET':
        resFacturas = Factura.objects.filter(estado="PA")
        pedidos = Pedido.objects.filter()

        totalProdcutosVendidos = pedidos.aggregate(Sum('cantidad'))

        productoMasVendido = pedidos.values('producto').annotate(
            cantidadPedidos=Count('producto'), totalVendido=Sum('cantidad')).order_by()[0]
        productoMasVendido['producto'] = Producto.objects.get(
            id=productoMasVendido['producto']).json()

        TotalIngreso = 0

        for factura in resFacturas:
            TotalIngreso += factura.total
        return JsonResponse({'TotalIngreso': TotalIngreso, 'TotalProductosVendidos': totalProdcutosVendidos, "productoMasVendido": productoMasVendido})


@csrf_exempt
def sendEmailTwilio(req):

    message = Mail(
        from_email='orson.manuel@gmail.com',
        to_emails='orson.manuel@gmail.com',
        subject='Sending with Twilio SendGrid is Fun',
        html_content='<strong>and easy to do anywhere, even with Python</strong>')
    try:
        sg = SendGridAPIClient(
            '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')
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return JsonResponse({'status': True})
    except Exception as e:
        print(e.message)
        return JsonResponse({'status': False})
