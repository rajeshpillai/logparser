export default class UploadFiles {
    constructor(el) {
        this.el = $(el); 
    }

    componentMounted () {
        $('#uploadForm').submit(function(e) {
            e.preventDefault();
            $("#upload-status").empty().text("File is uploading...");
            $(this).ajaxSubmit({
                error: function(xhr) {
                    $("#upload-status").text('Error: ' + xhr.status);
                },
                success: function(response) {
                    console.log(response)
                    $("#upload-status").empty().text(response);
                }
            });
           return false;
        });    
    }
    
    render() {
        let ui = `
        <h3>Upload Your Log files here</h3>
        <form id="uploadForm" action="/uploads" enctype="multipart/form-data" method="post">
            <input type="file" name="logFiles" accept="application/JSON" multiple>
            <input type="submit" value="Upload">
        </form>  
        <span id = "upload-status"></span>
        `;
        this.el.html(ui);
        this.componentMounted();
        return this;
    }
}  