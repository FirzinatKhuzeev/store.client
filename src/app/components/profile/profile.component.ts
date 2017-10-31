import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.user = this.userService.getCurrentUser();
  }
}
