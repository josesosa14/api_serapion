<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMovieShowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movie_shows', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('imdbID');
            $table->string('year',20);
            $table->string('rated',20)->nullable();
            $table->string('released',20)->nullable();
            $table->string('runtime',10)->nullable();
            $table->string('genre',100)->nullable();
            $table->string('director',50)->nullable();
            $table->string('actors',150)->nullable();
            $table->string('language',150)->nullable();
            $table->string('poster');
            $table->string('type',30);
            $table->string('totalSeasons',10)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movie_shows');
    }
}
