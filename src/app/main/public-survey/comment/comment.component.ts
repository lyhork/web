import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from './comment.service';
import { SnackbarService } from 'app/shared/services/snackbar.service';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
    public commentForm: UntypedFormGroup;
    public id: number;
    public saving: boolean = false;
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private _commentService: CommentService,
        private _snackBar: SnackbarService
    ) {
        this.route.paramMap.subscribe((params: any) => {
            this.id = params.get('id');
        });
    }
    ngOnInit(): void {
        this.formBuilder();
    }
    formBuilder(): void {
        this.commentForm = this._formBuilder.group({
            comment: [null, Validators.required]
        });
    }
    submit(): void {
        let data: object = {
            comment: this.commentForm.get('comment').value
        }
        this._snackBar.openSnackBar(this.id.toString(), '');
        this.saving = true;
        this._commentService.commnet(data,this.id).subscribe((res: any) => {
            this._snackBar.openSnackBar(res.message, '');
            this.router.navigate(['/thanks']);
        }, (err: any) => {
            console.log(err);
            this._snackBar.openSnackBar('ទិន្នន័យត្រូវបានបញ្ចូល!.', 'error');
        });
    }
}
