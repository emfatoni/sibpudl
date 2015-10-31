var ctrls = angular.module('DashboardController',[]);

ctrls.filter('tahun', function(){
	return function(inputs, tahun){
		var terfilter = [];
		if(tahun === undefined || tahun === ''){return inputs;
		}
		angular.forEach(inputs, function(item) {
			var tgl = item.tanggal+"";
			var tgls = tgl.split("-");

			if(isNaN(tahun)){
				var thns = tahun.split(" ");
				var new_thn = parseInt(thns[1]);
				var item_thn = parseInt(tgls[0]);

				if(thns[0] === "<"){
					if(item_thn <= new_thn){
						terfilter.push(item);
					}
				}else{
					if(item_thn >= new_thn){
						terfilter.push(item);
					}
				}
			}else{
				if((tahun+"") === (tgls[0]+"")){
					terfilter.push(item);
				}
			}
		});
		return terfilter;
	};
});
ctrls.filter('tahun_etb', function(){
	return function(inputs, tahun){
		var terfilter = [];
		if(tahun === undefined || tahun === ''){return inputs;
		}
		angular.forEach(inputs, function(item) {
			var tgl = item.tanggal+"";
			var tgls = tgl.split("-");

			if(isNaN(tahun)){
				var thns = tahun.split(" ");
				var new_thn = parseInt(thns[1]);
				var item_thn = parseInt(tgls[0]);

				if(thns[0] === "<"){
					if(item_thn <= new_thn){
						if(item.jenis == "Dana Lestari Tidak Bersyarat"){
							terfilter.push(item);	
						}
					}
				}else{
					if(item_thn >= new_thn){
						if(item.jenis == "Dana Lestari Tidak Bersyarat"){
							terfilter.push(item);	
						}
					}
				}
			}else{
				if((tahun+"") === (tgls[0]+"")){
					if(item.jenis == "Dana Lestari Tidak Bersyarat"){
						terfilter.push(item);	
					}
				}
			}
		});
		return terfilter;
	};
});
ctrls.filter('tahun_eb', function(){
	return function(inputs, tahun){
		var terfilter = [];
		if(tahun === undefined || tahun === ''){return inputs;
		}
		angular.forEach(inputs, function(item) {
			var tgl = item.tanggal+"";
			var tgls = tgl.split("-");

			if(isNaN(tahun)){
				var thns = tahun.split(" ");
				var new_thn = parseInt(thns[1]);
				var item_thn = parseInt(tgls[0]);

				if(thns[0] === "<"){
					if(item_thn <= new_thn){
						if(item.jenis == "Dana Lestari Bersyarat"){
							terfilter.push(item);	
						}
					}
				}else{
					if(item_thn >= new_thn){
						if(item.jenis == "Dana Lestari Bersyarat"){
							terfilter.push(item);	
						}
					}
				}
			}else{
				if((tahun+"") === (tgls[0]+"")){
					if(item.jenis == "Dana Lestari Bersyarat"){
						terfilter.push(item);	
					}
				}
			}
		});
		return terfilter;
	};
});
ctrls.filter('tahun_db', function(){
	return function(inputs, tahun){
		var terfilter = [];
		if(tahun === undefined || tahun === ''){return inputs;
		}
		angular.forEach(inputs, function(item) {
			var tgl = item.tanggal+"";
			var tgls = tgl.split("-");

			if(isNaN(tahun)){
				var thns = tahun.split(" ");
				var new_thn = parseInt(thns[1]);
				var item_thn = parseInt(tgls[0]);

				if(thns[0] === "<"){
					if(item_thn <= new_thn){
						if(item.jenis == "Donasi Bersyarat"){
							terfilter.push(item);	
						}
					}
				}else{
					if(item_thn >= new_thn){
						if(item.jenis == "Donasi Bersyarat"){
							terfilter.push(item);	
						}
					}
				}
			}else{
				if((tahun+"") === (tgls[0]+"")){
					if(item.jenis == "Donasi Bersyarat"){
						terfilter.push(item);	
					}
				}
			}
		});
		return terfilter;
	};
});
ctrls.controller('DashboardCtrl', function($scope, DonasiSvc, DonaturSvc, $location, $filter, lodash, FakultasSvc, ProdiSvc){

	// fungsi-fungsi awal
	$scope.get_fakultass = function(){
		var req = FakultasSvc.all();
		req.success(function(res){
			$scope.fakultass = res;
		});
	}
	$scope.get_prodis = function(){
		var req = ProdiSvc.all();
		req.success(function(res){
			$scope.prodis = res;
		});
	}



	$scope.is_loading = false;
	$scope.pageSize = 5;
	$scope.page_now = 1;
	$scope.filtered_donasi = {};

	$scope.fil_owner = function(){
		$scope.filtered_donasi = $filter('filter')($scope.donasis, {id_donatur:$scope.user_aktif.id_pengguna});
	}
	$scope.get_tahuns = function(){
		$scope.tahuns = [];
		var newlist = $filter('orderBy')($scope.donasis, 'tanggal', false);
	}
	$scope.get_donasis = function(){
		$scope.is_loading = true;
		var req = DonasiSvc.all();
		req.success(function(res){
			$scope.donasis = res;
			$scope.get_fakultass();
			$scope.get_prodis();
			$scope.fil_owner();
			$scope.is_loading = false;

			$scope.update_grafik_tahun('ei', $scope.max_ei);
			$scope.update_grafik_tahun('etbi', $scope.max_etbi);
			$scope.update_grafik_tahun('ebi', $scope.max_ebi);
			$scope.update_grafik_tahun('dbi', $scope.max_dbi);
			$scope.update_grafik_tahun('jdon', $scope.max_jdon);
			$scope.update_grafik_faknpro('fak', 2015, '');
			$scope.update_grafik_faknpro('pro', 2015, 2);
		});
	}

	/*
	$scope.update_categorie = function(keyword, xs){
		if(keyword == "ei"){
			$scope.chart_ei.xAxis.categories = xs;
		}else if(keyword == "etbi"){
			$scope.chart_etbi.xAxis.categories = xs;
		}else if(keyword == "ebi"){
			$scope.chart_ebi.xAxis.categories = xs;
		}else if(keyword == "dbi"){
			$scope.chart_dbi.xAxis.categories = xs;
		}else if(keyword == "jdon"){
			$scope.chart_jdon.xAxis.categories = xs;
		}else if(keyword == "fak"){
			$scope.chart_fak.xAxis.categories = xs;
		}else if(keyword == "pro"){
			$scope.chart_pro.xAxis.categories = xs;
		}
	}
	$scope.filter_tahun_fak = function(list, tahun, fak){
		var terfilter = [];
		if(tahun === undefined || tahun === ''){
			return list;
		}
		if(fak === undefined || fak === ''){
			return list;
		}
		angular.forEach(list, function(item){
			var tgl = item.tanggal+"";
			var tgls = tgl.split("-");

			if(isNaN(tahun)){
				var thns = tahun.split(" ");
				var new_thn = parseInt(thns[1]);
				var item_thn = parseInt(tgls[0]);

				if(thns[0] === "<"){
					if(item_thn <= new_thn){
						if(item.fakultas == fak){
							terfilter.push(item);
						}
					}
				}else{
					if(item_thn >= new_thn){
						if(item.fakultas == fak){
							terfilter.push(item);
						}
					}
				}
			}else{
				if((tahun+"") === (tgls[0]+"")){
					if(item.fakultas == fak){
						terfilter.push(item);
					}
				}
			}
		});
		return terfilter;
	}
	$scope.filter_tahun_pro = function(list, tahun, pro){
		var terfilter = [];
		if(tahun === undefined || tahun === ''){
			return list;
		}
		if(pro === undefined || pro === ''){
			return list;
		}
		angular.forEach(list, function(item){
			var tgl = item.tanggal+"";
			var tgls = tgl.split("-");

			if(isNaN(tahun)){
				var thns = tahun.split(" ");
				var new_thn = parseInt(thns[1]);
				var item_thn = parseInt(tgls[0]);

				if(thns[0] === "<"){
					if(item_thn <= new_thn){
						if(item.prodi == pro){
							terfilter.push(item);
						}
					}
				}else{
					if(item_thn >= new_thn){
						if(item.prodi == pro){
							terfilter.push(item);
						}
					}
				}
			}else{
				if((tahun+"") === (tgls[0]+"")){
					if(item.prodi == pro){
						terfilter.push(item);
					}
				}
			}
		});
		console.log(list);
		console.log(terfilter);
		return terfilter;
	}
	$scope.filter_graph_fak = function(listfak){
		var datas = [];
		
		angular.forEach(listfak, function(i){
			var total = 0;
			var faculty = $filter('filter')($scope.fakultass, {singkatan:i})[0];

			var tot_donasi = $scope.filter_tahun_fak($scope.donasis, $scope.tahun_fak, faculty.id);

			angular.forEach(tot_donasi, function(item){
				total += parseInt(item.nominal);
			});

			datas.push(total);
		});
		$scope.chart_fak.series[0].data = datas;
	}
	$scope.filter_graph_pro = function(listpro){
		var datas = [];
		
		angular.forEach(listpro, function(i){
			var total = 0;
			var prody = $filter('filter')($scope.prodis, {kepanjangan:i})[0];

			var tot_donasi = $scope.filter_tahun_pro($scope.donasis, $scope.tahun_pro, prody.id);

			angular.forEach(tot_donasi, function(item){
				total += parseInt(item.nominal);
			});

			datas.push(total);
		});
		$scope.chart_pro.series[0].data = datas;
	}
	$scope.update_categorie_fp = function(keyword){
		var vals = [];
		var valus = [];
		if(keyword == "fakultas"){
			angular.forEach($scope.fakultass, function(i){
				vals.push(i.singkatan);
				valus.push(0);
			});
			$scope.chart_fak.xAxis.categories = vals;
			$scope.chart_fak.series[0].data = valus;
			$scope.filter_graph_fak(vals);
		}else{
			var prodi_per_f = $filter('fakultas_prodi')($scope.prodis, keyword);

			angular.forEach(prodi_per_f, function(i){
				vals.push(i.kepanjangan);
				valus.push(0);
			});

			$scope.chart_pro.xAxis.categories = vals;
			$scope.chart_pro.series[0].data = valus;
			$scope.filter_graph_pro(vals);
		}
	}
	$scope.update_value = function(keyword, vals){
		if(keyword == "ei"){
			$scope.chart_ei.series[0].data = vals;
		}else if(keyword == "etbi"){
			$scope.chart_etbi.series[0].data = vals;
		}else if(keyword == "ebi"){
			$scope.chart_ebi.series[0].data = vals;
		}else if(keyword == "dbi"){
			$scope.chart_dbi.series[0].data = vals;
		}else if(keyword == "jdon"){
			$scope.chart_jdon.series[0].data = vals;
		}else if(keyword == "fak"){
			$scope.chart_fak.series[0].data = vals;
		}else if(keyword == "pro"){
			$scope.chart_pro.series[0].data = vals;
		}
	}
	$scope.filter_graph = function(keyword, val){
		if(keyword == "ei"){
			return $filter('tahun')($scope.donasis, val);
		}else if(keyword == "etbi"){
			return $filter('tahun_etb')($scope.donasis, val);
		}else if(keyword == "ebi"){
			return $filter('tahun_eb')($scope.donasis, val);
		}else if(keyword == "dbi"){
			return $filter('tahun_db')($scope.donasis, val);
		}else if(keyword == "jdon"){
			return $filter('tahun')($scope.donasis, val);
		}else if(keyword == "fak"){
			return {};
		}else if(keyword == "pro"){
			return {};
		}
	}
	$scope.get_data_donasi = function(keyword, tahuns){
		var datas = [];
		
		angular.forEach(tahuns, function(val, key){
			var total = 0;
			// var tot_donasi = $filter('tahun')($scope.donasis, val);
			var tot_donasi = $scope.filter_graph(keyword, val);

			if(keyword != "jdon"){
				angular.forEach(tot_donasi, function(item){
					if(item.status == "disahkan"){
						total += parseInt(item.nominal);
					}
				});
			}else{
				var jdonatur = lodash.groupBy(tot_donasi, 'id_donatur');
				total = lodash.size(jdonatur);
			}

			datas.push(total);
		});

		$scope.update_value(keyword, datas);
	}
	$scope.cek_lodash = function(){
		var hsl = lodash.groupBy($scope.donasis, 'jenis');
		console.log(hsl);
		console.log(lodash.size(hsl));
	}
	$scope.set_tahun = function(keyword, max_tahun){
		var tahuns = [];
		var intval = $scope.interval;

		if(keyword == "ei"){
			intval = intval*2;
		}

		// tahuns.push("< "+(max_tahun-5));

		for(var i=intval-1; i>=0; i--){
			tahuns.push(max_tahun-i);
		}

		// max_tahun++;
		// tahuns.push("> "+max_tahun);

		$scope.update_categorie(keyword, tahuns);

		$scope.get_data_donasi(keyword, tahuns);
	}
	*/


	// new filter
	$scope.update_xaxis = function(keyword, xs){
		if(keyword == "ei"){
			$scope.chart_ei.xAxis.categories = xs;
		}else if(keyword == "etbi"){
			$scope.chart_etbi.xAxis.categories = xs;
		}else if(keyword == "ebi"){
			$scope.chart_ebi.xAxis.categories = xs;
		}else if(keyword == "dbi"){
			$scope.chart_dbi.xAxis.categories = xs;
		}else if(keyword == "jdon"){
			$scope.chart_jdon.xAxis.categories = xs;
		}else if(keyword == "fak"){
			$scope.chart_fak.xAxis.categories = xs;
		}else if(keyword == "pro"){
			$scope.chart_pro.xAxis.categories = xs;
		}
	}
	$scope.update_yaxis = function(keyword, vals){
		if(keyword == "ei"){
			$scope.chart_ei.series[0].data = vals;
		}else if(keyword == "etbi"){
			$scope.chart_etbi.series[0].data = vals;
		}else if(keyword == "ebi"){
			$scope.chart_ebi.series[0].data = vals;
		}else if(keyword == "dbi"){
			$scope.chart_dbi.series[0].data = vals;
		}else if(keyword == "jdon"){
			$scope.chart_jdon.series[0].data = vals;
		}else if(keyword == "fak"){
			$scope.chart_fak.series[0].data = vals;
		}else if(keyword == "pro"){
			$scope.chart_pro.series[0].data = vals;
		}
	}
	$scope.update_nilai = function(keyword, tahuns){
		var datas = [];

		angular.forEach(tahuns, function(val, key){
			var total = 0;
			var tahun_filtered_donasi = $filter('filter')($scope.donasis, {tahun:val});
			var jenis_filtered_donasi = {};

			// filter berdasarkan jenis grafik
			if(keyword == "ei"){
				jenis_filtered_donasi = tahun_filtered_donasi;
			}else if(keyword == "etbi"){
				jenis_filtered_donasi = $filter('filter')(tahun_filtered_donasi, {jenis:"Dana Lestari Tidak Bersyarat"});
			}else if(keyword == "ebi"){
				jenis_filtered_donasi = $filter('filter')(tahun_filtered_donasi, {jenis:"Dana Lestari Bersyarat"});
			}else if(keyword == "dbi"){
				jenis_filtered_donasi = $filter('filter')(tahun_filtered_donasi, {jenis:"Donasi Bersyarat"});
			}else if(keyword == "jdon"){
				jenis_filtered_donasi = tahun_filtered_donasi;
			}

			// perhitungan total donasi per tahun
			if(keyword != "jdon"){
				angular.forEach(jenis_filtered_donasi, function(item){
					if(item.status == "disahkan"){
						total += parseInt(item.nominal);
					}
				});
			}else{
				var jdonatur = lodash.groupBy(jenis_filtered_donasi, 'id_donatur');
				total = lodash.size(jdonatur);
			}

			datas.push(total);
		});

		$scope.update_yaxis(keyword, datas);
	}
	$scope.update_grafik_tahun = function(keyword, max_tahun){
		var tahuns = [];
		var intval = $scope.interval;

		// untuk grafik utama, intervalnya 10 tahun
		if(keyword == "ei"){
			intval = intval*2;
		}

		// pembuatan ukuran xaxis
		for(var i=intval-1; i>=0; i--){
			tahuns.push(max_tahun-i);
		}

		$scope.update_xaxis(keyword, tahuns);
		$scope.update_nilai(keyword, tahuns);
	}
	
	$scope.update_nilai_faknpro = function(keyword, tahun_f, xaxis){
		var datas = [];

		if(keyword == "fak"){
			angular.forEach(xaxis, function(i){
				var total = 0;
				var fakultas_filtered_donasi = $filter('filter')($scope.donasis, {fakultas:i+""});

				var tahun_filtered_donasi = $filter('filter')(fakultas_filtered_donasi, {tahun:tahun_f});

				angular.forEach(tahun_filtered_donasi, function(item){
					if(item.status == "disahkan"){
						total += parseInt(item.nominal);
					}
				});
				datas.push(total);
			});
		}else{
			angular.forEach(xaxis, function(i){
				var total = 0;
				var prodi_filtered_donasi = $filter('filter')($scope.donasis, {prodi:i});

				console.log(i);
				console.log(prodi_filtered_donasi);

				var tahun_filtered_donasi = $filter('filter')(prodi_filtered_donasi, {tahun:tahun_f});

				angular.forEach(tahun_filtered_donasi, function(item){
					if(item.status == "disahkan"){
						total += parseInt(item.nominal);
					}
				});
				datas.push(total);
			});
		}
		$scope.update_yaxis(keyword, datas);
	}
	$scope.update_grafik_faknpro = function(keyword, tahun, idfakultas){
		var faculties = [];
		var majors = [];
		var faculties_id = [];
		var majors_id = [];
		var fakultas_filtered_prodi = {};

		// pembuatan ukuran xaxis sekaligus update nilai yaxis
		if(keyword == "fak"){
			angular.forEach($scope.fakultass, function(i){
				faculties.push(i.singkatan);
				faculties_id.push(i.id);
			});
			$scope.update_xaxis(keyword, faculties);
			$scope.update_nilai_faknpro(keyword, tahun, faculties_id);
		}else{
			fakultas_filtered_prodi = $filter('filter')($scope.prodis, {id_fakultas:idfakultas});
			angular.forEach(fakultas_filtered_prodi, function(i){
				majors.push(i.kepanjangan);
				majors_id.push(i.id);
			});
			$scope.update_xaxis(keyword, majors);
			$scope.update_nilai_faknpro(keyword, tahun, majors_id);
		}
	}
	
	

	// variabel-variabel
	$scope.eitahun_e = [0, 0, 0, 0, 0, 0, 0];
	$scope.eitahun_i = [20000000, 2000000, 220000000, 0, 0, 0, 0];
	$scope.tahun_eitahun = [];
	$scope.interval = 5;

	// pembuatan grafik
	$scope.chart_ei = {
		options: {
            chart: {
                type: 'column'
            },
            plotOptions: {
				column: {
					colorByPoint: true,
					colors: ['#27ae60'],
				}
			},
        },
        series: [
        	{
        		name: 'Endowment Fund',
        		data: $scope.eitahun_e
        	}
        ],
        title: {
            text: ''
        },
        xAxis: {
			categories: $scope.tahun_eitahun
		},	
		yAxis: {
			title: {
				text: 'Jumlah'
			}
		},
		loading: false
	}
	$scope.chart_etbi = {
		options: {
            chart: {
                type: 'column'
            },
            plotOptions: {
				column: {
					colorByPoint: true,
					colors: ['#f39c12'],
				}
			},
        },
        series: [
        	{
        		name: 'Endowment Fund Tak Bersyarat',
        		data: $scope.eitahun_e
        	}
        ],
        title: {
            text: ''
        },
        xAxis: {
			categories: $scope.tahun_eitahun
		},	
		yAxis: {
			title: {
				text: 'Jumlah'
			}
		},
		loading: false
	}
	$scope.chart_ebi = {
		options: {
            chart: {
                type: 'column'
            },
            plotOptions: {
				column: {
					colorByPoint: true,
					colors: ['#d35400'],
				}
			},
        },
        series: [
        	{
        		name: 'Endowment Fund Bersyarat',
        		data: $scope.eitahun_e
        	}
        ],
        title: {
            text: ''
        },
        xAxis: {
			categories: $scope.tahun_eitahun
		},	
		yAxis: {
			title: {
				text: 'Jumlah'
			}
		},
		loading: false
	}
	$scope.chart_dbi = {
		options: {
            chart: {
                type: 'column'
            },
            plotOptions: {
				column: {
					colorByPoint: true,
					colors: ['#2980b9'],
				}
			},
        },
        series: [
        	{
        		name: 'Donasi Bersyarat',
        		data: $scope.eitahun_e
        	}
        ],
        title: {
            text: ''
        },
        xAxis: {
			categories: $scope.tahun_eitahun
		},	
		yAxis: {
			title: {
				text: 'Jumlah'
			}
		},
		loading: false
	}
	$scope.chart_jdon = {
		options: {
            chart: {
                type: 'column'
            },
            plotOptions: {
				column: {
					colorByPoint: true,
					colors: ['#2c3e50'],
				}
			},
        },
        series: [
        	{
        		name: 'Donatur',
        		data: $scope.eitahun_e
        	}
        ],
        title: {
            text: ''
        },
        xAxis: {
			categories: $scope.tahun_eitahun
		},	
		yAxis: {
			title: {
				text: 'Jumlah'
			}
		},
		loading: false
	}
	$scope.chart_fak = {
		options: {
            chart: {
                type: 'column' 
            },
            plotOptions: {
				column: {
					colorByPoint: true,
					colors: ['#e74c3c'],
				}
			},
        },
        series: [
        	{
        		name: 'Fakultas',
        		data: $scope.eitahun_e
        	}
        ],
        title: {
            text: ''
        },
        xAxis: {
			categories: $scope.tahun_eitahun
		},	
		yAxis: {
			title: {
				text: 'Jumlah'
			}
		},
		loading: false
	}
	$scope.chart_pro = {
		options: {
            chart: {
                type: 'column'
            },
            plotOptions: {
				column: {
					colorByPoint: true,
					colors: ['#c0392b'],
				}
			},
        },
        series: [
        	{
        		name: 'Program Studi',
        		data: $scope.eitahun_e
        	}
        ],
        title: {
            text: ''
        },
        xAxis: {
			categories: $scope.tahun_eitahun
		},	
		yAxis: {
			title: {
				text: 'Jumlah'
			}
		},
		loading: false
	}

	// ending
	$scope.get_donasis();

});