import { NgModule } from '@angular/core';
import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ImageSelectorComponent, AdminHeaderComponent],
    imports: [
        CommonModule,
        RouterModule,
        ImageCropperModule
    ],
    exports: [ImageSelectorComponent, AdminHeaderComponent]
})
export class SharedComponentModule {}
