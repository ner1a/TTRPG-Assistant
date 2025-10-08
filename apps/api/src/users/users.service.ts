import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    getUsers() {
        return [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
    }
}
