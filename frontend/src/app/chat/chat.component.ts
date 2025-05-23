import { Component, OnInit, inject, signal } from '@angular/core';
import { ChatService } from './chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  name = signal('');
  message = signal('');
  contractId = 'CONTRATO123'; // esto lo obtenés dinámicamente según el caso

  constructor(public chatService: ChatService) {}

  ngOnInit() {
    this.chatService.connectToHub(this.contractId).then(() => {
      this.chatService.getHistory(this.contractId).subscribe((msgs) => {
        this.chatService.initMessages(msgs);
      });
    });
  }

  sendMessage() {
    this.chatService.sendMessage({
      contractId: this.contractId,
      sender: this.name(),
      message: this.message(),
      timestamp: new Date().toISOString()
    }).subscribe(() => {
      this.message.set('');
    });
  }
}
