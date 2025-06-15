import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import CardActionSheet from './src/sheets/CardActionSheet';
import CommentActionSheet from './src/sheets/CommentActionSheet';

registerSheet('card-sheet', CardActionSheet);
registerSheet('comment-sheet', CommentActionSheet);
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'card-sheet': SheetDefinition;
    'comment-sheet': SheetDefinition;
  }
}
export {};
