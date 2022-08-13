<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $reports = DB::table('reports')
        ->selectRaw('product_name, name, product_price, sum(purchase_quantity) as quantity, sum(product_price*purchase_quantity) as total_price')
        ->groupBy('product_name','name')
        ->orderBy('total_price', 'desc')
        ->get();
        return $reports;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $input = $request->all();

        for($i=0; $i<count($input); $i++){
             $purchase_data = $input[$i];
            $purchaseObj = new Report();
            $purchaseObj['created_at'] = $purchase_data['created_at'];
            $purchaseObj['name'] = $purchase_data['name'];
            $purchaseObj['order_no'] = $purchase_data['order_no'];
            $purchaseObj['product_code'] = $purchase_data['product_code'];
            $purchaseObj['product_name'] = $purchase_data['product_name'];
            $purchaseObj['product_price'] = (double)$purchase_data['product_price'];
            $purchaseObj['purchase_quantity'] = $purchase_data['purchase_quantity'];
            $purchaseObj['user_phone'] = $purchase_data['user_phone'];
            $report = $purchaseObj->save();
        }
        return response($report);
    }
}
