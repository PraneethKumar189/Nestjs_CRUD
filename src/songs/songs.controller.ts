import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './song.entity';
import { UpdateSongDto } from './dto/updateSong.dto';
import { UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
@Controller('songs')
export class SongsController {
    constructor(private songservice:SongsService){}
    @Post()
    create(@Body() createSongDto:CreateSongDto):Promise<Song>{
        const results= this.songservice.create(createSongDto);
        return results;
    }

    @Get()
   /* findAll(){
        return 'all songs endpoint'
    }*/
        findAll(@Query('page',new DefaultValuePipe(1),ParseIntPipe)    page:number=1,
          @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit:number =10):Promise<Pagination<Song>>{
            limit=limit>100?100:limit;
            return this.songservice.paginate({
                page,
                limit
            });
        
        }

        @Get(':id')
        findOne(
            @Param('id', new ParseIntPipe) id: number
        ):Promise<Song> {
            return this.songservice.findOne(id);
        }
        
    
    @Put(':id')
    update(@Param('id',ParseIntPipe)id:number,
           @Body() updatesongdto:UpdateSongDto):Promise<UpdateResult>{
        return this.songservice.update(id,updatesongdto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void>{
      return this.songservice.remove(id);
    }
}
