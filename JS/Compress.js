//图片压缩
function render(src) {
    return new Promise((resolve,reject)=>{
        let MAX_HEIGHT = 1024;
        let image = new Image();
        image.src = src;
        image.onload = function (){
            let canvas = document.createElement('canvas');
            if (image.height > MAX_HEIGHT && image.height >= image.width) {
                image.width *= MAX_HEIGHT / image.height;
                image.height = MAX_HEIGHT;
            }
            if (image.width > MAX_HEIGHT && image.width > image.height) {
                image.height *= MAX_HEIGHT / image.width;
                image.width = MAX_HEIGHT;
            }
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            resolve(canvas.toDataURL("image/jpeg"));
        }
    })
}
function reader(file) {
    return new Promise((resolve,reject)=>{
        let reader = new FileReader();
        reader.onload = async function (e) {
           resolve(await render(this.result));
        }
        reader.readAsDataURL(file);
    })
}
export async function compress (files = []) {
    let compressFiles = files;
    if (!Array.isArray(files)) {
        compressFiles = [files];
    }
    let compressedFiles = [];
    for(let i = 0; i < compressFiles.length; i++){
        let file = compressFiles[i];
        let base64 = await reader(file);
        compressedFiles.push({
            name: file.name,
            base64: base64
        })
    }
    if (Array.isArray(files)) {
        return compressedFiles;
    } else {
        return compressedFiles[0];
    }
}
