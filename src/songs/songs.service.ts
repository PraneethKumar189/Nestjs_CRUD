import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/updateSong.dto';
import { paginate,Pagination,IPaginationOptions } from 'nestjs-typeorm-paginate';
@Injectable()
export class SongsService {

    constructor(@InjectRepository(Song) private songrepository:Repository<Song>){}

    async paginate(options:IPaginationOptions):Promise<Pagination<Song>>{
        return paginate<Song>(this.songrepository,options);
    }


   async create(songDTO:CreateSongDto):Promise<Song>{
      const song =new Song();
      song.title=songDTO.title;
      song.artists=songDTO.artists;
      song.duration=songDTO.duration;
      song.lyrics=songDTO.lyrics;
      song.releaseDate=songDTO.releasedDate;

      return await this.songrepository.save(song);

   }
findAll():Promise<Song[]> {
            return this.songrepository.find();
   }

findOne(id:number):Promise<Song>{
            return this.songrepository.findOneBy({id})
  }

  async remove(id:number):Promise<void>{
   await this.songrepository.delete(id);
  }

  update(id:number,recordToUpdate:UpdateSongDto):Promise<UpdateResult>{
    return this.songrepository.update(id,recordToUpdate)
  }
}

