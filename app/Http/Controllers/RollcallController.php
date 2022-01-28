<?php

namespace App\Http\Controllers;

use App\Http\Resources\Attendance;
use App\Http\Resources\AttendanceCollection;
use Illuminate\Http\Request;
use \Auth;

class RollcallController extends Controller
{
    public function status()
    {
        return [
            "entered" => Auth::user()->isEntered(),
            "attendances" => $this->lastAttendances()
        ];
    }

    public function rollcallIn()
    {
        if (Auth::user()->isEntered()) {
            return [
                "success" => false,
                "isEntered" => true,
                "attendances" => $this->lastAttendances()
            ];
        }

        $rollcallStatus = Auth::user()->rollcallIn();

        return [
            "success" => true,
            "attendances" => $this->lastAttendances()
        ];
    }

    public function rollcallOut()
    {
        if (!Auth::user()->isEntered()) {
            return [
                "success" => false,
                "notEntered" => true,
                "attendances" => $this->lastAttendances()
            ];
        }
        $rollcallStatus = Auth::user()->rollcallOut();
        return [
            "success" => true,
            "attendances" => $this->lastAttendances()
        ];
    }

    private function lastAttendances()
    {
        return Attendance::collection(Auth::user()->lastAttendances());
    }
}
