import { IsArray,IsInt,IsString,IsDate,IsDateString,IsOptional,IsMilitaryTime,IsNotEmpty} from "class-validator";

export class UpdateSongDto{
    @IsString()
    @IsOptional()
    readonly title;

    @IsOptional()
    @IsArray()
    @IsString({each:true})
    readonly artists;

    @IsDateString()
    @IsOptional()
    readonly realeaseDate:Date;

    @IsMilitaryTime()
    @IsOptional()
    readonly duration:Date;

    @IsString()
    @IsOptional()
    readonly lyrics:string;
}