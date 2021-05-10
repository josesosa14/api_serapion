<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Models\MovieShow;

class MovieShowController extends Controller
{
    public function index() {
        return MovieShow::all();
    }
    public function show($id)
    {
        return MovieShow::find($id);
    }
    public function getByTitle($title)
    {
        $movieShows = MovieShow::where('title','LIKE', '%'.$title.'%')->get();
        if(count($movieShows) == 0){
            $client = new Client(['base_uri' => env('API_URL')]);
            $response = $client->request('GET', '', ['query' => ['s' => $title, 'apikey' => env('API_KEY')]]);
            $res = json_decode($response->getBody());
            if(isset($res->Error)){
                return response()->json($res);
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
        $movieShows = MovieShow::where('imdbID','=', $imdbID)->first();
        
        if($movieShows->actors == null){
            $client = new Client(['base_uri' => env('API_URL')]);
            $response = $client->request('GET', '', ['query' => ['i' => $imdbID, 'apikey' => env('API_KEY')]]);
            $res = json_decode($response->getBody());
            
            if(isset($res->Error)){
                return response()->json($res);
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
            abort(500);
        }
        return $movieShows;
    }
}
