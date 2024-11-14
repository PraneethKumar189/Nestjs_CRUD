import { IsInt,isArray,IsString,IsDate,IsDateString, IsMilitaryTime,IsNotEmptyObject, IsNotEmpty, IsArray} from "class-validator";

export class  CreateSongDto{
    @IsString()
    @IsNotEmpty()
    readonly title;

    @IsArray()
    @IsNotEmpty()
    @IsString({each:true})
    readonly artists;

@IsDateString()
@IsNotEmpty()
readonly releasedDate:Date;

@IsMilitaryTime()
@IsNotEmpty()
readonly duration:Date;
    lyrics: string;
}