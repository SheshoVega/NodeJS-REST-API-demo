var db = connect("localhost:27017/NodeJS-REST-API-demo");

db.createCollection('projects');

var data = [
    {
        "title": "Desarrollo de Angular aplication",
        "type": "application",
        "tecnologies": [
            "Javascript",
            "NodeJS",
            "Angular",
            "Typescript",
            "MongoDB"
        ],
        "state": "testing",
        "product": "Aplicación Angular"
    },
    {
        "title": "Diseño de UI de Sitio Web",
        "type": "website",
        "tecnologies": [
            "HTML5",
            "CSS3"
        ],
        "state": "design",
        "product": "UI de Sitio Web"
    },
    {
        "title": "Desarrollo de Python REST API",
        "type": "api",
        "tecnologies": [
            "Python",
            "Django",
            "MySQL"
        ],
        "state": "maintenance",
        "product": "Python REST API"
    },
    {
        "title": "Desarrollo de VueJS aplication",
        "type": "application",
        "tecnologies": [
            "Javascript",
            "VueJS",
            "PHP",
            "Slim",
            "PostgreSQL"
        ],
        "state": "development",
        "product": "Aplicación VueJS"
    },
    {
        "title": "Desarrollo de NodeJS REST API",
        "type": "api",
        "tecnologies": [
            "Javascript",
            "Express",
            "NodeJS",
            "MongoDB"
        ],
        "state": "requirements",
        "product": "NodeJS REST API"
    },
    {
        "title": "Desarrollo de React aplication",
        "type": "application",
        "tecnologies": [
            "Javascript",
            "JSX",
            "ReactJS",
            "NodeJS",
            "MongoDB"
        ],
        "state": "desing",
        "product": "Aplicación ReactJS"
    },
    {
        "title": "Desarrollo de PHP REST API",
        "type": "api",
        "tecnologies": [
            "PHP",
            "Slim",
            "PostgreSQL"
        ],
        "state": "development",
        "product": "PHP REST API"
    },
    {
        "title": "Desarrollo de CMS para Sitio Web",
        "type": "cms",
        "tecnologies": [
            "PHP",
            "Wordpress"
        ],
        "state": "development",
        "product": "CMS para Sitio Web"
    },
    {
        "title": "Desarrollo de Golang REST API",
        "type": "api",
        "tecnologies": [
            "Golang",
            "MongoDB"
        ],
        "state": "design",
        "product": "Golang REST API"
    }
];

for (var i = 0; i < data.length; i++) {
    const project = data[i];
    db.projects.insert(project);    
}