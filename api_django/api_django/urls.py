"""api_django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from facturacion import views
from django.views.generic import TemplateView

# Serializers define the API representation.


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']

# ViewSets define the view behavior.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('checkout', TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
    path('clients', views.getAllClient),
    path('create-client', views.createClient),
    path('delete-client/<int:id>/', views.deleteClient),
    path('update-client/<int:id>/', views.updateClient),
    path('client/<int:id>', views.getIdClient),

    path('create-factura', views.createFactura),
    path('factura/client/<int:id>', views.getFacturaIdCliente),
    path('factura/<int:id>', views.getFactura),
    path('factura/<int:id>/estado', views.updateEstadoFactura),
    path('factura/<int:id>/impuesto', views.changeImpuestoIdFactura),
    path('factura/<int:id>/descuento', views.changeDescuentoIdFactura),
    path('facturas', views.getAllFacturas),

    path('create-pedido', views.createPedidoFactura),
    path('pedido/factura/<int:id>', views.getPedidoIdFactura),
    path('pedido/<int:id>', views.deletePedidoId),

    path('productos', views.getAllProducts),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('impuestos', views.getAllImpuestos),
    path('descuentos', views.getAllDescuentos),
    path('pedido/<int:id>/cantidad', views.setCantidadIdPedido),
    path('totales', views.getTotales),
]
