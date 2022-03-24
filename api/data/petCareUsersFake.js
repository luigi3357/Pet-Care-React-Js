

const user = [
  {
    email: "juliohernandez@gmail.com",
    password: "juliohernandez123",
    name: "julio",
    last_name: "hernandez",
    bio: "Hola!! soy Julio Hernandez de Quilmes BA, soy psicólogo de profesión y estoy terminando mi segunda carrera en MV ,trabajo de apoyo en la clínica veterinaria de mi tío así que tengo conocimientos y experiencia necesaria para atender las necesidades de sus mascotas.",
    phone: "911-12345678",
    keeper: true,
    location: [
      {
        direccion: "Av. Hipólito Yrigoyen 373",
        lat: -34.720407,
        lng: -58.262576
      }
    ],
    rating: 4.0,
    bookings: 5,
    myImages: [
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242165.jpg",
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242042.jpg",
      "https://imgar.zonapropcdn.com/avisos/resize/1/00/46/83/60/99/1200x1200/1743242122.jpg",
    ],
    profileImgURL: "https://as2.ftcdn.net/v2/jpg/02/41/41/19/1000_F_241411954_4YTOaAtM4QrIMhOVLgglstw3PUGRvonq.jpg",
  },
  {
    email: "francomiño@gmail.com",
    password: "francomiño123",
    name: "franco",
    keeper: true,
    last_name: "miño",
    phone: "911-23456781",
    bio: "Hola!! soy Franco Miño de Quilmes BA, Me dedico al adiestramiento canino, a la rehabilitación de perros con problemas de conducta. Me dedico al 100% a amar a los pequeños peludos que me dejan a cuidar como si estuvieran en su casa",
    location: [
      {
        direccion: "Rodolfo López 81",
        lat: -34.720769,
        lng: -58.264777
      }
    ],
    rating: 5.0,
    bookings: 5,
    myImages: [
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242165.jpg",
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242042.jpg",
      "https://imgar.zonapropcdn.com/avisos/resize/1/00/46/83/60/99/1200x1200/1743242122.jpg",
    ],
    profileImgURL:
      "https://as2.ftcdn.net/v2/jpg/02/41/41/19/1000_F_241411954_4YTOaAtM4QrIMhOVLgglstw3PUGRvonq.jpg",
  },
  {
    email: "luiscataldo@gmail.com",
    password: "luiscataldo123",
    name: "luis",
    keeper: true,
    last_name: "cataldo",
    phone: "911-34567812",
    location: [
      {
        direccion: "Av. Vicente López 757",
        lat: -34.721371,
        lng: -58.267015
      }
    ],
    bio: "Hola!! soy Luis Cataldo de Quilmes BA, soy profesor y también me encantan los animales. Se lo importante que es para ti tu mascota. Nos encantaría darle todo nuestro cariño mientras estás de viaje. Cuenta conmigo.",
    rating: 4.0,
    bookings: 4,
    myImages: [
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242165.jpg",
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242042.jpg",
      "https://imgar.zonapropcdn.com/avisos/resize/1/00/46/83/60/99/1200x1200/1743242122.jpg",
    ],
    profileImgURL:
      "https://as2.ftcdn.net/v2/jpg/02/41/41/19/1000_F_241411954_4YTOaAtM4QrIMhOVLgglstw3PUGRvonq.jpg",
  },
  {
    email: "darianesquivel@gmail.com",
    password: "darianesquivel123",
    name: "darian",
    last_name: "esquivel",
    keeper: true,
    phone: "911-45678123",
    bio: "Hola!! soy Darian Esquivel de morón BA, tus mascotas no sentirán el cambio de casa porque al quedar con nosotros entran en un ambiente de hogar y con la seguridad de un médico en casa.",
    location: [
      {
        direccion: "Sta. Fe 620",
        lat: -34.655811,
        lng: -58.617867
      }
    ],
    rating: 4.0,
    myImages: [
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242165.jpg",
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242042.jpg",
      "https://imgar.zonapropcdn.com/avisos/resize/1/00/46/83/60/99/1200x1200/1743242122.jpg",
    ],
    bookings: 4,
    profileImgURL:
      "https://as2.ftcdn.net/v2/jpg/02/41/41/19/1000_F_241411954_4YTOaAtM4QrIMhOVLgglstw3PUGRvonq.jpg",
  },
  {
    email: "pablomoyano@gmail.com",
    password: "pablomoyano123",
    name: "pablo",
    last_name: "moyano",
    keeper: true,
    phone: "911-56781234",
    location: [
      {
        direccion: "Ortiz de Rosas 1365",
        lat: -34.659387,
        lng: -58.627250
      }
    ],
    rating: 3.0,
    myImages: [
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242165.jpg",
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242042.jpg",
      "https://imgar.zonapropcdn.com/avisos/resize/1/00/46/83/60/99/1200x1200/1743242122.jpg",
    ],
    bookings: 3,
    bio: "Hola!! soy Pablo Moyano de Morón BA, Desde pequeño me encantan los animales! Cerca de mi casa hay 2 parques donde tu perrito podrá pasear y divertirse, nosotros disfrutaremos de su linda compañía y él de una excelente atención!.",
    profileImgURL:
      "https://as2.ftcdn.net/v2/jpg/02/41/41/19/1000_F_241411954_4YTOaAtM4QrIMhOVLgglstw3PUGRvonq.jpg",
  },
  {
    email: "sebastianguerra@gmail.com",
    password: "sebastianguerra123",
    name: "sebastian",
    keeper: true,
    last_name: "guerra",
    phone: "911-67812345",
    location: [
      {
        direccion: "Corrientes 437",
        lat: -34.762713,
        lng: -58.425439
      }
    ],
    rating: 3.0,
    myImages: [
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242165.jpg",
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242042.jpg",
      "https://imgar.zonapropcdn.com/avisos/resize/1/00/46/83/60/99/1200x1200/1743242122.jpg",
    ],
    bio: "Hola!! soy Sebastian Guerra de Lomas de Zamora BA, Me ofrezco a su cuidado porque amo la experiencia de incluir nuevos miembros a mi manada y hacerlos parte de mi rutina diaria, aunque sea de manera temporal",
    bookings: 3,
    profileImgURL:
      "https://as2.ftcdn.net/v2/jpg/02/41/41/19/1000_F_241411954_4YTOaAtM4QrIMhOVLgglstw3PUGRvonq.jpg",
  },
  {
    email: "lucasduran@gmail.com",
    password: "lucasduran123",
    keeper: true,
    name: "lucas",
    bio: "Hola!! soy Lucas Duran de Lomas de Zamora BA, rescatista de animales desde hace más de 3 años. Mi vida y mi pasión son los animales. Gracias a mi trabajo como voluntario rescatista he tenido la oportunidad de convivir con cientos de perros y gatos, lo que me ha ayudado a comprender su comportamiento, emociones y necesidades físicas.",
    last_name: "duran",
    phone: "911-78123456",
    location: [
      {
        direccion: "176 Sta. Mónica",
        lat: -34.763166,
        lng: -58.440480
      }
    ],
    rating: 2.0,
    bookings: 2,
    myImages: [
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242165.jpg",
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242042.jpg",
      "https://imgar.zonapropcdn.com/avisos/resize/1/00/46/83/60/99/1200x1200/1743242122.jpg",
    ],
    profileImgURL:
      "https://as2.ftcdn.net/v2/jpg/02/41/41/19/1000_F_241411954_4YTOaAtM4QrIMhOVLgglstw3PUGRvonq.jpg",
  },
  {
    email: "juanparaducha@gmail.com",
    password: "juanparaducha123",
    bio: "Hola!! soy Juan Paraducha de Palermo BA, he sido cuidador desde hace varios meses, amo los animales en especial a los perros. Cuento con un jardín amplio donde las mascotas pueden divertirse, tomar el sol y jugar sin salir de casa",
    name: "juan",
    last_name: "paraducha",
    keeper: true,
    phone: "911-81234567",
    location: [
      {
        direccion: "3540 Olleros",
        lat: -34.581399,
        lng: -58.450359
      }
    ],
    rating: 1.0,
    bookings: 2,
    myImages: [
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242165.jpg",
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242042.jpg",
      "https://imgar.zonapropcdn.com/avisos/resize/1/00/46/83/60/99/1200x1200/1743242122.jpg",
    ],
    profileImgURL:
      "https://as2.ftcdn.net/v2/jpg/02/41/41/19/1000_F_241411954_4YTOaAtM4QrIMhOVLgglstw3PUGRvonq.jpg",
  },
  {
    email: "admin@gmail.com",
    password:"$2a$10$XS4U7EY7H7bVTsmNa6nMvOLKlSrGr5p/14JWQG8SRseiK6zyBw1DK",
    name: "admin",
    last_name: "admin",
    bio: "soy admin",
    keeper: false,

    phone: "911-12345678",
    Admin:true,
    location: [
      {
        direccion: "admin",
        lat: -34.720407,
        lng: -58.262576
      }
    ],
    rating: 5.0,
    bookings: 5,
    myImages: [
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242165.jpg",
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242042.jpg",
      "https://imgar.zonapropcdn.com/avisos/resize/1/00/46/83/60/99/1200x1200/1743242122.jpg",
    ],
    profileImgURL:
      "https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1559&q=80",
  },
];

const post = [
  {
    email: "juliohernandez@gmail.com",
    type: "roedores",
    size: "mediano",
    title: "Acerca de Julio Hernandez",
    price: 50,
    description:
      "Hola!! soy Julio Hernandez, cuido roedores, de Jueves a Domingo desde las 7:00 am, si recoges tu mascota después de las 15:00 hrs se cobrará día completo. ",
  },
  {
    email: "juliohernandez@gmail.com",
    type: "perro",
    size: "pequeño",
    title: "Acerca de Julio Hernandez",
    price: 80,
    description:
      "Hola!! soy Julio Hernandez, cuido perros peuqeños, de Lunes a Miercoles desde las 7:00 am, si recoges tu mascota después de las 15:00 hrs se cobrará día completo.",
  },
  {
    email: "francomiño@gmail.com",
    type: "gato",
    size: "grande",
    price: 100,
    title: "Acerca de Franco Miño",
    description:
      "Hola!! soy Franco Miño, amo los gatos así que me dedico a ellos 100%, no importa si son grandes, medianos o pequeños. Los cuido de Lunes a Domingo en cualquier horario. Es importante que no olvides tener su esquema de vacunación.",
  },
  {
    email: "luiscataldo@gmail.com",
    type: "perro",
    size: "pequeño",
    title: "Acerca de Luis Cataldo",
    price:120,
    description:
      "Hola!! soy Luis Cataldo, Cuido perros pequeños. Para que tu peludo este mas comodo, es importante: Alimento para todos los días, Plato de comida, Cartilla de vacunación completa y al día, libre de parásitos, así todos están protegidos !!Solo cuido mascotas esterilizadas. ",
  },
  {
    email: "luiscataldo@gmail.com",
    type: "perro",
    size: "grande",
    title: "Acerca de Luis Cataldo",
    price: 170,
    description:
      "Hola!! soy Luis Cataldo, Cuido perros grandes. Para que tu peludo este mas comodo, es importante: Alimento para todos los días, Plato de comida, Cartilla de vacunación completa y al día, libre de parásitos, así todos están protegidos !!Solo cuido mascotas esterilizadas.",
  },
  {
    email: "darianesquivel@gmail.com",
    title: "Acerca de Darian Esquivel",
    type: "aves",
    size: "mediano",
    price: 90,
    description:
      "Hola!! soy Darian Esquivel cuido aves, de Lunes a Viernes desde las 12:00 m, si recoges tu mascota después de las 14:00 hrs se cobrará día completo.",
  },
  {
    email: "pablomoyano@gmail.com",
    title: "Acerca de Pablo Moyano",
    type: "aves",
    size: "grande",
    price:70,
    description:
      "Hola!! soy Pablo Moyano, Me encantan las aves! Las cuido fines de semana. Lo que requerimos para poder cuidar de tu pequeñín es necesario que traiga su comida.",
  },
  {
    email: "sebastianguerra@gmail.com",
    title: "Acerca de Sebastian Guerra",
    type: "gato",
    size: "pequeño",
    price:200,
    description:
      "Hola!! soy Sebastian Guerra, Me ofrezco al cuidado porque crecí con 3 de ellos. Cuido de Lunes a Viernes",
  },
  {
    email: "lucasduran@gmail.com",
    title: "Acerca de Lucas Duran",
    type: "gato",
    size: "mediano",
    price:50,
    description:
      "Hola!! soy Lucas Duran, rescatista de animales. Cuido tus gatos de Sabado a Lunes, desde las 8:00 am hasta las 22:00.",
  },
  {
    email: "lucasduran@gmail.com",
    title: "Acerca de Lucas Duran",
    type: "perro",
    size: "mediano",
    price: 150,
    description:
      "Hola!! soy Lucas Duran, rescatista de animales. Cuido tus perros de Sabado a Lunes, desde las 8:00 am hasta las 22:00.",
  },
  {
    email: "juanparaducha@gmail.com",
    title: "Acerca de Juan Paraducha",
    type: "perro",
    size: "grande",
    price:350,
    description:
      "Hola!! soy Juan Paraducha, he sido cuidador de perros toda mi vida, es importante que tengan su esquema de vacunación al día. Cuido tus canes de Lunes a Viernes las 24 horas del día. ",
  },{
    email: "juanparaducha@gmail.com",
    title: "Acerca de Juan Paraducha",
    type: "perro",
    size: "pequeño",
    price: 300,
    description:
      "Hola!! soy Juan Paraducha, he sido cuidador de perros toda mi vida, es importante que tengan su esquema de vacunación al día. Cuido tus canes de Lunes a Viernes las 24 horas del día. ",
  },
];
const feedback = [
  {
    email1: "juliohernandez@gmail.com",
    email2: "francomiño@gmail.com",
    message:
      "Deje a mi mascota con Julio, y no pude haber quedado más feliz. Lo cuidó de maravilla y mi conejo regreso a casa feliz. 100% recomendado.",
    rate: "5",
  },
  {
    email1: "francomiño@gmail.com",
    email2: "luiscataldo@gmail.com",
    message:
      "Estamos muy contentos por las atenciones de Franco. Siempre nos manda fotos y videos",
    rate: "4",
  },
  {
    email1: "luiscataldo@gmail.com",
    email2: "darianesquivel@gmail.com",
    message:
      "Es de toda nuestra confianza y podemos estar seguros de que ellos están bien mientras estan con Luis",
    rate: "4",
  },
  {
    email1: "darianesquivel@gmail.com",
    email2: "pablomoyano@gmail.com",
    message:
      "Fue nuestra primera vez con la aplicación y sin dudarlo recomiendo ampliamente a Darian!! Muchas gracias.",
    rate: "5",
  },
  {
    email1: "pablomoyano@gmail.com",
    email2: "sebastianguerra@gmail.com",
    message:
      "Excelente servicio!!! durante el hospedaje Pablo nos estuvo mandando fotos y videos de nuestro peludo.",
    rate: "5",
  },
  {
    email1: "sebastianguerra@gmail.com",
    email2: "lucasduran@gmail.com",
    message:
      "Durante su cuidado me mantuvo al tanto de mi mascota y viendo las fotos que me mandaba supe que la estaba pasando bien.",
    rate: "5",
  },
  {
    email1: "lucasduran@gmail.com",
    email2: "juanparaducha@gmail.com",
    message:
      "Es el mejor!!! Mi gato es feliz con Lucas. Yo lo dejo con los ojos cerrados, confío en el 100%.",
    rate: "5",
  },
  {
    email1: "lucasduran@gmail.com",
    email2: "juanparaducha@gmail.com",
    message:
      "Es el mejor!!! Mi gato es feliz con Lucas. Yo lo dejo con los ojos cerrados, confío en el 100%.",
    rate: "3",
  },
  {
    email1: "lucasduran@gmail.com",
    email2: "juanparaducha@gmail.com",
    message:
      "Es el mejor!!! Mi gato es feliz con Lucas. Yo lo dejo con los ojos cerrados, confío en el 100%.",
    rate: "3",
  },
  {
    email1: "sebastianguerra@gmail.com",
    email2: "lucasduran@gmail.com",
    message:
      "No lo recomiendo. El día que acordamos entregar a Jero llegó tarde!! y casi pierso mi vuelo.",
    rate: "1",
  },
];

module.exports = {
  user,
  post,
  feedback,
};