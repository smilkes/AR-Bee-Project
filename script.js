
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Pokèmon',
            location: {
                // decomment the following and add coordinates:
                lat: 33.923928,
                lng: -84.003468,
            },
        },
    ];
}

/*var audiofiles = [
    {
    url: './assets/magnemite/5-Kick-C78.mp3',
        volume: '1',
},
             {url: './assets/articuno/alter.mp3',
              volume: '1',
             },
             {url: './assets/dragonite/8-SnareBritishVintage.mp3',
              volume: '1',
             },
            ];*/

var models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];
//var audioIndex = 0;
var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

/*var setModelsI = function (audiofiles, entity) {
    if (audiofiles.volume) {
        entity.setAttribute('volume', audiofiles.volume);
    }

    entity.setAttribute('mp3-audiofiles', audiofiles.url);

    //const div = document.querySelector('.instructions');
    //div.innerText = audiofiles.info;
};*/

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       // let audio = document.createElement('a-entity');
       // audio.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);
       // setModelsI(audiofiles[audioIndex], audiofiles);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
            //audioIndex++;
            //var newIndexI = audioIndex % audiofiles.length;
           // setModelsI(audiofiles[newIndexI], entity);
             const audio = document.querySelector('audio');
            audio.play();
    
            
        });

        scene.appendChild(model);
        //audiofiles.play();

    });
}
