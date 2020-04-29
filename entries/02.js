import {Viewer} from 'photo-sphere-viewer';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
import '../style.css'

let loading = document.querySelector('#loading');


const getQueries = () => {
    const search = location.search.substring(1);
    if (!search) return {};
    const temp = search.split('&');
    const res = {};
    temp.forEach(item => {
        let a = item.split('=');
        res[a[0]] = a[1];
    });
    return res;
};

const Queries = getQueries();

console.log(Queries);


function changePicture(Viewer, src) {
    loading.classList.add('active');
    Viewer.setPanorama(src).then(() => {
        loading.classList.remove('active');
    }).catch(err => {
        console.log(err.message);
    })
}

const viewer = new Viewer({
    container: document.querySelector('#canvas'),
    panorama: '/images/360.jpg',
    navbar: [
        {
            id: 'button1',
            title: '蓝色',
            content: '',
            className: 'button blue',
            onClick: () => {
                changePicture(viewer, '/images/1.jpg')
            }
        },
        {
            id: 'button2',
            title: '规格2',
            className: 'button red',
            onClick: () => {
                changePicture(viewer, '/images/360.jpg')
            }
        },
    ]
});
