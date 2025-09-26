import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get()
    getUsers() {
        return [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
    }

}
