import { ApiProperty } from "@nestjs/swagger";
import { 
    IsString,
    IsNotEmpty,
} from "class-validator";


export class CreateAuthorDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    hashedPassword: string;
}
