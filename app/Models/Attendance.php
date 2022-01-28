<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;
    protected $fillable=["start_at","end_at","user_id"];
    public function end()
    {
        $this->end_at = Carbon::now();
        $this->save();
    }
}
