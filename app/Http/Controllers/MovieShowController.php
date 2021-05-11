<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\MovieShow;

class MovieShowController extends Controller
{
    public function getByTitle($title)
    {
        if(!$title){
            return response()->json(['Error' => 'Missing parameter'],400);
        }
        $movieShows = MovieShow::where('title','LIKE', '%'.$title.'%')->get();
        if(count($movieShows) == 0){
            $client = new Client(['base_uri' => env('API_URL')]);
            $response = $client->request('GET', '', ['query' => ['s' => $title, 'apikey' => env('API_KEY')]]);
            $res = json_decode($response->getBody());
            if(isset($res->Error)){
                return response()->json($res,404);
            }
            $arraySearch = array();
            foreach ($res->Search as $key=>$value){
                foreach($value as $keyItem=>$valueItem){
                    $movObj[lcfirst($keyItem)] = $valueItem;
                }
                $arraySearch[] = $movObj;
            }
            $movieShows = MovieShow::insert($arraySearch);
            if($movieShows)
                return $arraySearch;
        }
        return $movieShows;
    }
    public function getDetail($imdbID){
        if(!$imdbID){
            abort(400, 'misssing parameters');
        }
        $movieShows = MovieShow::where('imdbID','=', $imdbID)->first();
        if(!$movieShows){
            return response()->json(['Error' => 'movie or shows not found'],404);
        }
        else if($movieShows->actors == null){
            $client = new Client(['base_uri' => env('API_URL')]);
            $response = $client->request('GET', '', ['query' => ['i' => $imdbID, 'apikey' => env('API_KEY')]]);
            $res = json_decode($response->getBody());
            
            if(isset($res->Error)){
                return response()->json($res,404);
            }
            $atributes = $movieShows->getAttributes();
            foreach($res as $key=>$value){
                $key = lcfirst($key);
                if(!is_array($value) && array_key_exists($key,$atributes)){
                    $update[$key] = $value; 
                }
            }
            if(MovieShow::where('imdbID','=', $imdbID)->update($update)){
                return response()->json($update);
            }
            return response()->json(['Error' => 'Internal server error'],500);
        }
        return response()->json($movieShows);
    }
}
