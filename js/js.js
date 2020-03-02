$(document).ready(function () {
    
  
   //add product
    $('#btn-click-save-product').click(function () {
        // khai báo biến dùng từ khóa : let,var,const
        //$('#txt-title'): gọi đến phần tử trong DOM(file html)
        // dùng hàm val() để lấy giá trị

        let txtTitle = $('#txt-title').val();
        let txtCategory = $('#txt-category').val();
        let txtPublisher = $('#txt-publisher').val();
        let txtYear = $('#txt-year').val();
        //
        $.ajax({
            // đường dẫn đến file xử lý
            url: "san-pham-add.php",
            //phương thức gửi
            method: "post",
            //dữ liệu gửi theo kiểu json {key:value}
            data: {
                txtTitle: txtTitle,
                txtCategory: txtCategory,
                txtPublisher: txtPublisher,
                txtYear: txtYear
            },
            success: function (data) {
                //đổ dữ liệu
                $('#list-product').html(data);
                //đóng modal
                $('#modelId').modal('hide');
            }
        });
    });
    //search prolet search = $(this).val()
    // search keyup() khi nhập bàn sẽ gọi ajax luôn
    $('#txt-search-product').keyup(function () {
        let search = $(this).val();
        if (search !== '') {
            $.ajax({
                url: "san-pham-search.php",
                method: "post",
                data: {search: search},
                success: function (data) {
                    $('#list-product').html(data);
                }
            })
        }
    });
    //delete product
    $('.btn-click-delete-product').on('click', function () {

        let id = $(this).attr('data-id');

        if (confirm('Bạn có muốn xóa không')) {
            $(this).parent().parent().hide();
            $.ajax({
                url: "san-pham-delete.php",
                method: "get",
                data: {id: id},
                success: function () {
			id = '';                
}
            });
        }
    });
    //update product
    $('.btn-click-edit-product').on('click', function () {
        let id = $(this).attr('data-id');
        //lấy dữ liệu
        let title = $(this).parent().prev().prev().prev().prev().text();
        let category = $(this).parent().prev().prev().prev().text();
        let publisher = $(this).parent().prev().prev().text();
        let year = $(this).parent().prev().text();
        // alert(title);
        //đổ lên modal update
        var txtId =  $('#id-up').val(id);
        $('#txt-title-up').val(title);
        $('#txt-category-up').val(category);
        $('#txt-publisher-up').val(publisher);
        $('#txt-year-up').val(year);
        // alert(txtTitle);


    });
    $('#btn-click-save-update-product').click(function () {
        let id = $('#id-up').val();
        let txtTitle = $('#txt-title-up').val();
        let txtCategory = $('#txt-category-up').val();
        let txtPublisher = $('#txt-publisher-up').val();
        let txtYear = $('#txt-year-up').val();
        $.ajax({
            url: "san-pham-update.php",
            method: "get",
            data: {
                id: id,
                txtTitle: txtTitle,
                txtCategory: txtCategory,
                txtPublisher: txtPublisher,
                txtYear: txtYear
            },
            success: function (data) {
                $('#list-product').html(data);
                $('#modelIdUpdate').modal('hide');
			id=''
            }
        });
    });
    // page
    $('.page').click(function () {
        let pageNumber = $(this).attr('data-dt-idx');
        $.ajax({
            url:"phan-trang-pro.php",
            method:"post",
            data:{pageNumber:pageNumber},
           success: function (data) {
            $('#list-product').html(data);
           }
        });
    })

	// Thêm mới
	$('#btSave').click(function () {
        // khai báo biến dùng từ khóa : let,var,const
        //$('#txt-title'): gọi đến phần tử trong DOM(file html)
        // dùng hàm val() để lấy giá trị
		var pageNumber = $('#pageNumber').val();
		var pageCount = $('#pageCount').val();
        var tbAuthorName = $('#tbAuthorName').val();
        var tbMoreInfo = $('#tbMoreInfo').val();
        //
        $.ajax({
            // đường dẫn đến file xử lý
            url: "tac-gia-add.php",
            //phương thức gửi
            method: "post",
            //dữ liệu gửi theo kiểu json {key:value}
            data: {
                tbAuthorName: tbAuthorName,
                tbMoreInfo: tbMoreInfo,
				pageNumber: pageNumber
            },
            success: function (data) {
				// Nếu đang ở trang cuối cùng
				if (pageNumber == pageCount) {
                	//đổ dữ liệu
                	$('#list-author').html(data);
				}
                //đóng modal
                $('#modelId').modal('hide');
            }
        });
    });
	
	// Tìm kiếm
	$('#tbSearch').keyup(function () {
        let search = $(this).val();
		var pageNumber = $('#pageNumber').val();
		 
        if (search !== ''){
            $.ajax({
                url:"tac-gia-search.php",
                method:"post",
                data:{
					search:search,
					pageNumber: pageNumber				
				},
                success: function (data) {
                    $('#list-author').html(data);
                }
            })
        }
    });
	
	// Xóa
	$(document).on('click', '#btDelete', function(){
      let id = $(this).attr('name');
	  var pageNumber = $('#pageNumber').val();
      var pageCount = $('#pageCount').val();

      $.ajax({
        url: 'tac-gia-delete.php',
        type: 'POST',
        data: {
          id: id,
		  pageNumber: pageNumber 
        },
        success: function(data){
          //đổ dữ liệu
          $('#list-author').html(data);
        }
      });
    })
	
	// Sửa: đổ dữ liệu ra form
	var idUpdate;
    $(document).on('click', '#btEdit', function(){
		//alert('response');
        let name = $(this).attr('name');
        $.ajax({
            url: 'tac-gia-edit.php',
            type: 'POST',
            data: {
                name: name
            },

            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            
            success: function(response){
				//alert(response);
                let getArray = jQuery.parseJSON(response);
                idUpdate = getArray.id;
                $('#tbAuthorNameUpdate').val(getArray.AuthorName); //alert(getArray.AuthorName);
                $('#tbMoreInfoUpdate').val(getArray.MoreInfo);    //alert(getArray.MoreInfo);             
            }
        })
    });
	
	// Cập nhật Sửa
    $('#btUpdate').on('click', function(){
        let tbAuthorNameUpdate = $('#tbAuthorNameUpdate').val();
        let tbMoreInfoUpdate = $('#tbMoreInfoUpdate').val();
		var pageNumber = $('#pageNumber').val();

        $.ajax({
            url: 'tac-gia-update.php',
            type: 'POST',
            data: {
                id: idUpdate,
                tbAuthorNameUpdate: tbAuthorNameUpdate,
                tbMoreInfoUpdate: tbMoreInfoUpdate,
		  	    pageNumber: pageNumber 
            },
            success: function(data){   
                alert('Cập nhật thành công!');
                $('#list-author').html(data);
                $('#modelId-update').modal('hide');
                idUpdate = "";
            }
        });
    });
});
