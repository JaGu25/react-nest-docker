import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { CreateUserDto } from 'src/auth/dto/create-user-dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/auth/dto/login-user-dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly jwtService: JwtService,
    ) { }

    async create(createUserDto: CreateUserDto) {
        try {
            const { password, ...userData } = createUserDto;

            const user = this.userRepository.create({
                ...userData,
                password: bcrypt.hashSync(password, 10)
            });

            await this.userRepository.save(user)
            delete user.password;

            return {
                ...user,
                token: this.getJwtToken({ id: user.id })
            };
        } catch (error) {
            this.handleDBErrors(error);
        }
    }

    async login(loginUserDto: LoginUserDto) {
        const { password, email } = loginUserDto;

        const user = await this.userRepository.findOne({
            where: { email },
            select: { email: true, password: true, id: true, active: true, fullName: true, roles: true }
        });

        if (!user)
            throw new UnauthorizedException('Credentials are not valid (email)');

        if (!bcrypt.compareSync(password, user.password))
            throw new UnauthorizedException('Credentials are not valid (password)');

        delete user.password;

        return {
            ...user,
            token: this.getJwtToken({ id: user.id })
        };
    }

    async refreshToken(user: User) {
        return {
            ...user,
            token: this.getJwtToken({ id: user.id })
        };
    }

    private getJwtToken(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }

    private handleDBErrors(error: any): never {
        if (error.code === '23505')
            throw new BadRequestException(error.detail);

        throw new InternalServerErrorException('Please check server logs');
    }
}
