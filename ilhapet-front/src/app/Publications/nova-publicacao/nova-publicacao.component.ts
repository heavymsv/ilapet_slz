import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import IBlog from 'src/app/interfaces/IBlog';
import IImagem from 'src/app/interfaces/IImagem';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-nova-publicacao',
  templateUrl: './nova-publicacao.component.html',
  styleUrls: ['./nova-publicacao.component.css']
})
export class NovaPublicacaoComponent {
  titulo: string = ""
  descricao: string = ""
  isLoading = false

  fileName = '';

  blog: IBlog = { titulo: this.titulo, texto: this.descricao, imagem: '' }

  formData = new FormData();
  uploadProgress: number;

  constructor(private http: HttpClient,
    private blogService: BlogService,
    private notificationService: ToastrService,
    private auth: AuthService) { }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      this.formData = new FormData()

      this.formData.append("file", file);

      console.log(this.formData);

      //const upload$ = this.http.post("/api/thumbnail-upload", formData);

      //upload$.subscribe();
    }
  }

  onSubmit() {
    const upload$ = this.http.post<any>("http://localhost:8080/blog/img", this.formData, {
      headers: this.auth.buildHeader(),
    }).pipe(finalize(() => {
      this.blogService.create(this.blog).subscribe((data) => {

        this.descricao = ''
        this.fileName = ''
        this.titulo = ''
        this.isLoading = false

        this.notificationService.success('Postagem feita com sucesso!!', 'Postado!', {
          progressBar: true,
        })

      })
    })
    );
    this.isLoading = true
    upload$.subscribe((data) => {
      console.log(data);

      this.blog.imagem = data.nome
      this.blog.titulo = this.titulo
      this.blog.texto = this.descricao

      if (data.type == HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (data.loaded / data.total));
        console.log(this.uploadProgress)
      }


    });
  }

  verifica(): boolean {
    let key = localStorage.getItem('T-WMS_token')
    return key == undefined
  }

}
