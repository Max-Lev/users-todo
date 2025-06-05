import { AfterViewInit, ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, Input, signal, ViewChild, viewChild, viewChildren } from '@angular/core';
import { UsersTasksStore } from '../../core/store/users.store';
import { UsersService } from '../../core/providers/users.service';
import { ActivatedRoute } from '@angular/router';
import { User, UsersResponseDto } from '../../shared/models/users-response.model';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAccordion, MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ExpansionPanelState } from '../../core/store/edit-users.store';
import { patchState } from '@ngrx/signals';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-user-page',
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],

  templateUrl: './edit-user-page.component.html',
  styleUrl: './edit-user-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserPageComponent implements AfterViewInit {
  private usersTasksStore = inject(UsersTasksStore);
  private usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);

  accordion = viewChild.required(MatAccordion);

  destroy = inject(DestroyRef);

  @Input() id: string = '';
  
  selectedUser = computed(() => this.usersTasksStore.selectedUser() ?? null);
  
  userId = computed(() => this.activatedRoute.snapshot.paramMap.get('id'));
  
  user = toSignal(this.usersService.getUserById$(+this.userId()!));

  step = signal(0);

  panels = viewChildren(MatExpansionPanel);

  expansionPanelState = ExpansionPanelState;

  constructor() {
    effect(() => {
      // console.log('id: ', this.id)
      // console.log('user by id: ', this.user())
      // console.log('userId: ', this.userId())
      // console.log('Selected user:', this.selectedUser());
      console.log('expansionPanelState ', this.expansionPanelState())

    });

    effect(() => {
      if(this.user()){
        this.usersTasksStore.setSelectedUser(this.user()!);
      }
    });
  }
  ngAfterViewInit(): void {


    this.panels().forEach((panel, index) => {
      panel.opened.subscribe(() => {
        console.log(`Panel ${index} opened`);
        this.setStep(index);
      });

      panel.closed.subscribe(() => {
        console.log(`Panel ${index} closed`);
      });
    });



  }

  handleButtonClick(sectionIndex: number, action: string) {
    console.log(sectionIndex, action);
    switch (action) {
      case 'next':
        this.nextStep();
        break;
      case 'previous':
        this.prevStep();
        break;
      case 'end':
        this.endProcess();
        break;
    }
  }


  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update(i => i + 1);
    console.log(this.accordion())
  }

  prevStep() {
    this.step.update(i => i - 1);

  }
  endProcess() {
    console.log('Process completed!');
    // Handle completion logic here
  }

  // openPanel(index: number) {

  //   const panel = this.panels()[index];
  //   if (panel) {
  //     panel.expanded = true; // This will open the panel


  //   }
  // }

}
