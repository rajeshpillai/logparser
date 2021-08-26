export default class UploadFiles {
    constructor(el) {
        this.el = $(el); 
    }

    componentMounted () {
    }
    
    render() {
        let ui = `
        <h3>Upload Your Log files here</h3>
        <form action="/uploads" enctype="multipart/form-data" method="post">
            <input type="file" name="multi-files" accept="application/JSON" multiple>
            <input type="submit" value="Upload">
        </form>  
        `;
        this.el.html(ui);
        return this;
    }
}  