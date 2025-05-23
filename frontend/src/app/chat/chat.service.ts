import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import { Signal, signal } from '@angular/core';

export interface ChatMessage {
  contractId: string;
  sender: string;
  message: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private hubConnection?: signalR.HubConnection;
  private baseUrl = 'http://localhost:5197';

  private _messages = signal<ChatMessage[]>([]);
  messages = this._messages.asReadonly();

  constructor(private http: HttpClient) {}

  async connectToHub(contractId: string) {
  this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${this.baseUrl}/chathub?contractId=${contractId}`)
    .build();

  this.hubConnection.on('ReceiveMessage', (msg: ChatMessage) => {
    this._messages.update((prev) => [...prev, msg]);
  });

  try {
    await this.hubConnection.start();
    console.log('✅ Hub conectado');
  } catch (err) {
    console.error('❌ Error conectando al Hub:', err);
  }
}

  initMessages(msgs: ChatMessage[]) {
    this._messages.set(msgs);
  }

  getHistory(contractId: string) {
    return this.http.get<ChatMessage[]>(`${this.baseUrl}/api/chat/history/${contractId}`);
  }

  sendMessage(message: ChatMessage) {
    // Enviar al controller → guarda y propaga
    return this.http.post(`${this.baseUrl}/api/chat/send`, message);
  }
}
