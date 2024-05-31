
import { io } from 'socket.io-client';
import { WithWss } from './PathMap';

const URL = WithWss();

export const socket = io(URL);