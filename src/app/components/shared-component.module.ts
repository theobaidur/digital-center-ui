import { NgModule } from '@angular/core';
import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
    declarations: [ImageSelectorComponent],
    imports: [
        CommonModule,
        ImageCropperModule
    ],
    exports: [ImageSelectorComponent]
})
export class SharedComponentModule {}
