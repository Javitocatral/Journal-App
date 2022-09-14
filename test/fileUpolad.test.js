import { v2 as cloudinary } from 'cloudinary';
import { fileUpolad } from "../../08-journal-app/src/helpers/fileUpolad";

cloudinary.config({
    cloud_name:'Cloud Name',
    api_key:'616932975223929',
    api_secret:'9nK_ZGmSXmIFYOnKVCoNLJ3H8mo',
    secure: true
})


describe('Pruebas en fileUpload', () => { 
    test('debe de subir el archivo correctamente a cloudinary', async() => {

        const imageUrl = 'https://static.dw.com/image/58845200_303.jpg';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpolad( file );
        expect( typeof url ).toBe('string');

        // console.log(url);
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg','');
        
        const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
           resource_type: 'image'
        });
        // console.log({ cloudResp })

    });

      test('debe re tornar null',  async() => { 
        const file = new File([], 'foto.jpg');
        const url = await fileUpolad (file);
        expect( url).toBe(null);

       });
 })