from django.contrib import admin
from .models import Cliente
from .models import Factura
from .models import Descuento
from .models import Impuesto
from .models import Pedido
from .models import Producto

# Register your models here.
admin.site.register(Cliente)
admin.site.register(Factura)
admin.site.register(Impuesto)
admin.site.register(Descuento)
admin.site.register(Pedido)
admin.site.register(Producto)
