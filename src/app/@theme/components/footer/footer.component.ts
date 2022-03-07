import { Component } from "@angular/core";

@Component({
  selector: "ngx-footer",
  styleUrls: ["./footer.component.scss"],
  template: `
    <div class="socials">
    </div>
    <span class="created-by"> جميع الحقوق محفوظة &copy; {{currentYeat}} </span>
    <div class="socials">
      <a href="https://www.facebook.com/groups/132997337347438/?ref=share" target="_blank" class="ion ion-social-facebook"></a>
    </div>
  `,
})
export class FooterComponent {
  currentYeat = new Date(Date.now()).getFullYear();
}
