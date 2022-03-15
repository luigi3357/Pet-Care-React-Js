const user = [
  {
    email: "juliohernandez@gmail.com",
    password: "juliohernandez123",
    name: "julio",
    last_name: "hernandez",
    bio: "Pequeña bio generica contando lo terrible que es mi vida y que a nadie le interesa saber",
    phone: "911-12345678",
    location: [
      "Quilmes",
      "Av. Hipólito Yrigoyen 373",
      "-34.720407, -58.262576",
    ],
    rating: 4.0,
    bookings: 5,
    myImages: [
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242165.jpg",
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242042.jpg",
      "https://imgar.zonapropcdn.com/avisos/resize/1/00/46/83/60/99/1200x1200/1743242122.jpg",
    ],
    profileImgURL:
      "https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1559&q=80",
  },
  {
    email: "francomiño@gmail.com",
    password: "francomiño123",
    name: "franco",
    last_name: "miño",
    phone: "911-23456781",
    bio: "Pequeña bio generica contando lo terrible que es mi vida y que a nadie le interesa saber",
    location: ["Quilmes", "Rodolfo López 81", "-34.720769, -58.264777"],
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
    last_name: "cataldo",
    phone: "911-34567812",
    location: ["Quilmes", "Av. Vicente López 757", "-34.721371, -58.267015"],
    bio: "Pequeña bio generica contando lo terrible que es mi vida y que a nadie le interesa saber",
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
    phone: "911-45678123",
    bio: "Pequeña bio generica contando lo terrible que es mi vida y que a nadie le interesa saber",
    location: ["Morón", "Sta. Fe 620", "-34.655811, -58.617867"],
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
    phone: "911-56781234",
    location: ["Morón", "Ortiz de Rosas 1365", "-34.659387, -58.627250"],
    rating: 3.0,
    myImages: [
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242165.jpg",
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242042.jpg",
      "https://imgar.zonapropcdn.com/avisos/resize/1/00/46/83/60/99/1200x1200/1743242122.jpg",
    ],
    bookings: 3,
    bio: "Pequeña bio generica contando lo terrible que es mi vida y que a nadie le interesa saber",
    profileImgURL:
      "https://as2.ftcdn.net/v2/jpg/02/41/41/19/1000_F_241411954_4YTOaAtM4QrIMhOVLgglstw3PUGRvonq.jpg",
  },
  {
    email: "sebastianguerra@gmail.com",
    password: "sebastianguerra123",
    name: "sebastian",
    last_name: "guerra",
    phone: "911-67812345",
    location: ["Lomas de Zamora", "Corrientes 437", "-34.762713, -58.425439"],
    rating: 3.0,
    myImages: [
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242165.jpg",
      "https://imgar.zonapropcdn.com/avisos/1/00/46/83/60/99/1200x1200/1743242042.jpg",
      "https://imgar.zonapropcdn.com/avisos/resize/1/00/46/83/60/99/1200x1200/1743242122.jpg",
    ],
    bio: "Pequeña bio generica contando lo terrible que es mi vida y que a nadie le interesa saber",
    bookings: 3,
    profileImgURL:
      "https://as2.ftcdn.net/v2/jpg/02/41/41/19/1000_F_241411954_4YTOaAtM4QrIMhOVLgglstw3PUGRvonq.jpg",
  },
  {
    email: "lucasduran@gmail.com",
    password: "lucasduran123",
    name: "lucas",
    bio: "Pequeña bio generica contando lo terrible que es mi vida y que a nadie le interesa saber",
    last_name: "duran",
    phone: "911-78123456",
    location: ["Lomas de Zamora", "176 Sta. Mónica", "-34.763166, -58.440480"],
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
    bio: "Pequeña bio generica contando lo terrible que es mi vida y que a nadie le interesa saber",
    name: "juan",
    last_name: "paraducha",
    phone: "911-81234567",
    location: ["Palermo", "3540 Olleros", "-34.581399, -58.450359"],
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
];

const post = [
  {
    email: "juliohernandez@gmail.com",
    type: "roedores",
    size: "mediano",
    title: "Acerca de Julio Hernandez",
    price: 50,
    description:
      "Hola!! soy Julio Hernandez de Quilmes BA, soy psicólogo de profesión y estoy terminando mi segunda carrera en MV ,trabajo de apoyo en la clínica veterinaria de mi tío así que tengo conocimientos y experiencia necesaria para atender las necesidades de sus mascotas",
  },
  {
    email: "francomiño@gmail.com",
    type: "gato",
    size: "grande",
    price: 100,
    title: "Acerca de Franco Miño",
    description:
      "Hola!! soy Franco Miño de Quilmes BA, Me dedico al adiestramiento canino, a la rehabilitación de perros con problemas de conducta. Me dedico al 100% a amar a los pequeños peludos que me dejan a cuidar como si estuvieran en su casa",
  },
  {
    email: "luiscataldo@gmail.com",
    type: "roedores",
    size: "pequeño",
    title: "Acerca de Luis Cataldo",
    price:180,
    description:
      "Hola!! soy Luis Cataldo de Quilmes BA, soy profesor y también me encantan los animales. Se lo importante que es para ti tu mascota. Nos encantaría darle todo nuestro cariño mientras estás de viaje. Cuenta conmigo.",
  },
  {
    email: "darianesquivel@gmail.com",
    title: "Acerca de Darian Esquivel",
    type: "roedores",
    size: "grande",
    price: 90,
    description:
      "Hola!! soy Darian Esquivel de morón BA, tus mascotas no sentirán el cambio de casa porque al quedar con nosotros entran en un ambiente de hogar y con la seguridad de un médico en casa.",
  },
  {
    email: "pablomoyano@gmail.com",
    title: "Acerca de Pablo Moyano",
    type: "aves",
    size: "grande",
    price:70,
    description:
      "Hola!! soy Pablo Moyano de Morón BA, Desde pequeño me encantan los animales! Cerca de mi casa hay 2 parques donde tu perrito podrá pasear y divertirse, nosotros disfrutaremos de su linda compañía y él de una excelente atención!.",
  },
  {
    email: "sebastianguerra@gmail.com",
    title: "Acerca de Sebastian Guerra",
    type: "gato",
    size: "pequeño",
    price:200,
    description:
      "Hola!! soy Sebastian Guerra de Lomas de Zamora BA, Me ofrezco a su cuidado porque amo la experiencia de incluir nuevos miembros a mi manada y hacerlos parte de mi rutina diaria, aunque sea de manera temporal",
  },
  {
    email: "lucasduran@gmail.com",
    title: "Acerca de Lucas Duran",
    type: "gato",
    size: "mediano",
    price:50,
    description:
      "Hola!! soy Lucas Duran de Lomas de Zamora BA, rescatista de animales desde hace más de 3 años. Mi vida y mi pasión son los animales. Gracias a mi trabajo como voluntario rescatista he tenido la oportunidad de convivir con cientos de perros y gatos, lo que me ha ayudado a comprender su comportamiento, emociones y necesidades físicas.",
  },
  {
    email: "juanparaducha@gmail.com",
    title: "Acerca de Juan Paraducha",
    type: "perro",
    size: "grande",
    price:350,
    description:
      "Hola!! soy Juan Paraducha de Palermo BA, he sido cuidador desde hace varios meses, amo los animales en especial a los perros. Cuento con un jardín amplio donde las mascotas pueden divertirse, tomar el sol y jugar sin salir de casa",
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