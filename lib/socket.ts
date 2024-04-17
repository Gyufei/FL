
import { io } from 'socket.io-client';

const URL = "wss://wss-tadle.aggregation.top"

export const socket = io(URL);