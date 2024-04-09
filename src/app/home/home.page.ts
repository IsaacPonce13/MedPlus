import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'; // Importa Storage
import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class HomePage {
  @ViewChild(IonModal)
  modal!: IonModal;
  usuarios: any = [];
  
  citas: any[] = [];
  cita: any = {};
  citaSeleccionada: any = {};
  medicamentos: any[] = [];
  medicamento: any = {};

  // Declaración de los elementos del usuario
  elemento: {
    usuario: string;
    nombre: string;
    contrasena: string;
    Nseguro: string;
    fotografia: string;
    id: number;
  } = {
    usuario: '',
    nombre: '',
    contrasena: '',
    Nseguro: '',
    fotografia: '',
    id: 0,
  };

  usuario = '';
  contrasena = '';
  
      //Modales
      MenuPrincipal  = false;
      CitasModal: boolean = false;
      agregarCitasModal: boolean = false;
      // editarCitasModal: boolean = false;
      MedicamentosModal: boolean = false;
      agregarMedicamentoModal: boolean = false;
      verInfoUsuarioModal: boolean = false;
      ChatMedico : boolean = false;
      // ChatMedicoModal: boolean = false;
    
      username: string="";
      password: string="";
      rememberMe: boolean=false;
      name: string="";
      storeName: string="";
      imageUrl: string="";
      notiendas=0;
  
      mensajes: { texto: string; esUsuario: boolean }[] = [];
      nuevoMensaje: string = '';

      //datos de los usuarios
      constructor(private alertController: AlertController, private storage: Storage, private inAppBrowser: InAppBrowser) {
        this.initStorage();
        this.loadUsuarios();
      }
        // Inicializa el servicio Storage
      async initStorage() {
        await this.storage.create();
      }
        // Cargar usuarios desde el localStorage
      async loadUsuarios() {
        const storedUsuarios = await this.storage.get('usuarios');
        this.usuarios = storedUsuarios || [];
      }
        // Guardar usuarios en el localStorage
      async saveUsuarios() {
        await this.storage.set('usuarios', this.usuarios);
      }
    
      // Modulos abiertos y cerrados, se ejecutan al presionar los botones para realizar sus respectivas funciones
      setOpen(isOpen: boolean) {
        this.MenuPrincipal = isOpen;
      }
      cerrarCitas()
      {
      this.CitasModal=false;
      }
      citasModal()
      {
        this.CitasModal=true;
      }
      AgregarCitasModal()
      {
        this.agregarCitasModal=true;
      }
      // Función para abrir el modal de medicamentos
      AgregarMedicamentoModal() {
        this.agregarMedicamentoModal = true;
      }
    
      medicamentosModal(){
        this.MedicamentosModal = true;
      }
    
      CancelarAgregarMedicamentoModal() {
        this.agregarMedicamentoModal = false;
      }
    
      cerrarMedicamentos(){
        this.MedicamentosModal = false;
      }

      VerInfoUsuarioModal(){
        this.verInfoUsuarioModal = true;
      }

      CerrarInfoUsuariosModal(){
        this.verInfoUsuarioModal = false;
      }

      AbrirChatMedicoModal(){
        this.ChatMedico = true;
      }

      cerrarChatMedicoModal() {
        this.ChatMedico = false;
      }
    

      // // Modulos de ventas
      // cerrarProductos() {
      //   this.ProductosModal = false;
      // }
      // productosModal() {
      //   this.ProductosModal = true;
      // }
      // AgregarProductosModal() 
      // {
      //   this.agregarProductosModal = true;
      // }

      // // Modulos de ventas
      // cerrarVentas(){
      //   this.VentasModal = false;
      // }
      // ventasModal() {
      //   this.VentasModal = true;
      // }
      // agregarVentaModal(){
      //   this.AgregarVentaModal = true;
      // }

      //Apartado del log in
      login() {
        const indice = this.usuarios.findIndex((usuario: { usuario: any; contrasena: any }) => {
          return usuario.usuario === this.usuario && usuario.contrasena === this.contrasena;
        });

        if (indice !== -1) {
          this.elemento = this.usuarios[indice];
          console.log(this.elemento);
          this.setOpen(true);
        } else {
          alert('No se encontró el usuario');
        }
      }
      // Registrarse
      register(){}
      // Cancelar registro
      cancel() {
        this.modal.dismiss(null, 'cancel');
      }
      // Guardar nuevo usuario y asignarle un id
      guardarusuario() {
        let id = 0;
        if (this.usuarios.length > 0) id = this.usuarios[this.usuarios.length - 1].id + 1;
        else id = 1;

        this.usuarios.push({
          usuario: this.name,
          nombre: this.username,
          contrasena: this.password,
          Nseguro: this.storeName,
          fotografia: this.imageUrl,
          id: id,
        });

        this.saveUsuarios(); // Guardar en localStorage
        this.name = '';
        this.username = '';
        this.password = '';
        this.storeName = '';
        this.imageUrl = '';
        this.modal.dismiss(null, 'guardarusuario');
      }
      guardarCita() {
        let id = 0;
        if (this.citas.length > 0) {
          id = (this.citas[this.citas.length - 1].id) + 1;
        } else {
          id = 1;
        }
        
        this.cita.id = id;
        this.citas.push({ ...this.cita });
    
        // Guardar las citas en el localStorage
        localStorage.setItem('citas', JSON.stringify(this.citas));
    
        // Limpiar el objeto cita
        this.cita = {};
    
        // Cerrar el modal de agendar cita
        this.agregarCitasModal = false;
      }

      // Función para eliminar una cita
      eliminarCita(citaId: number) {
        // Filtrar las citas, excluyendo la cita que se eliminará
        this.citas = this.citas.filter(c => c.id !== citaId);
        // Guardar las citas actualizadas en el localStorage
        localStorage.setItem('citas', JSON.stringify(this.citas));
      }
    
            // Cancelar agregar citas
    CancelarAgregarCitasModal(){
      this.agregarCitasModal=false;
    }
      // Cancelar actualizar citas
      // CancelarActualizarCitasModal(){
      //   this.editarCitasModal=false;
      // }
      // ... Otro código de tu componente
    
      // Función para cargar las citas almacenadas en el localStorage
      cargarCitasDesdeLocalStorage() {
        const citasLocalStorage = localStorage.getItem('citas');
    
        if (citasLocalStorage) {
          this.citas = JSON.parse(citasLocalStorage);
        }
      }

  // Función para guardar un medicamento
  guardarMedicamento() {
    // Agrega el medicamento al array de medicamentos
    this.medicamentos.push({ ...this.medicamento, id: this.medicamentos.length + 1 });
    
    // Almacena el array de medicamentos en el local storage
    localStorage.setItem('medicamentos', JSON.stringify(this.medicamentos));

    // Limpia los datos temporales del medicamento
    this.medicamento = {};

    // Cierra el modal de medicamentos
    this.CancelarAgregarMedicamentoModal();
  }

  // Función para cargar datos desde el local storage al inicializar
  cargarDatosLocalStorage() {
    const citasLocalStorage = localStorage.getItem('citas');
    const medicamentosLocalStorage = localStorage.getItem('medicamentos');

    if (citasLocalStorage) {
      this.citas = JSON.parse(citasLocalStorage);
    }

    if (medicamentosLocalStorage) {
      this.medicamentos = JSON.parse(medicamentosLocalStorage);
    }
  }

  eliminarMedicamento(id: number) {
    // Filtra el array de medicamentos para excluir el medicamento con el ID proporcionado
    this.medicamentos = this.medicamentos.filter(medicamento => medicamento.id !== id);

    // Almacena el array actualizado en el local storage
    localStorage.setItem('medicamentos', JSON.stringify(this.medicamentos));
  }

  openWhatsAppConversation(phoneNumber: string) {
    const url = `https://wa.me/${phoneNumber}`;
    this.inAppBrowser.create(url, '_system');
  }

  // Llamada a la función de cargar datos al inicializar el componente
  // ngOnInit() {
  //   this.cargarDatosLocalStorage();
  // }

  // async VerInfoUsuarioModal() {
  //   this.verInfoUsuarioModal = true;
  //   const modal = await this.modalController.create({
  //     component: TuComponente,
  //     componentProps: {
  //       elemento: this.elemento
  //     }
  //   });
  //   await modal.present();
  // }

    

  
  

    // enviarMensaje() {
    //   if (this.nuevoMensaje.trim() !== '') {
    //     // Agregar mensaje del usuario
    //     this.mensajes.push({ texto: this.nuevoMensaje, esUsuario: true });
  
    //     // Responder automáticamente
    //     setTimeout(() => {
    //       this.mensajes.push({ texto: 'En un momento lo atendemos, espere pacientemente', esUsuario: false });
    //     }, 1000);
  
    //     // Limpiar el campo de nuevo mensaje
    //     this.nuevoMensaje = '';
    //   }
    // }

      onWillDismiss(event: Event) {
        const ev = event as CustomEvent<OverlayEventDetail<string>>;
        /*
        if (ev.detail.role === 'guardarusuario') {
  
        }
        */
      }
    }
  