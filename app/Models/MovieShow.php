<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovieShow extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'year', 'imdbID', 'poster', 'type'];

}
