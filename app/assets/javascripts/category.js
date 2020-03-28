$(document).on('turbolinks:load', function(){
  $(function(){
    // カテゴリーセレクトボックスのオプションを作成
    function appendOption(category){
      var html = `<option value="${category.id}" data-category="${category.id}">${category.category}</option>`;
      return html;
    }
    // 子カテゴリーの表示作成
    function appendChidrenBox(insertHTML){
      var childSelectHtml = '';
      childSelectHtml = `<div class='listing-select-wrapper__added' id= 'children_wrapper'>
                          <div class='listing-select-wrapper__box'>
                            <select class="listing-select-wrapper__box--select" id="child_category" name="item[category_id]" required>
                              <option value="---" data-category="---">---</option>
                              ${insertHTML}
                            </select>
                            <i class='fas fa-chevron-down listing-select-wrapper__box--arrow-down'></i>
                          </div>
                        </div>`;
      $('.listing-item-detail__category').append(childSelectHtml);
    }
    // 孫カテゴリーの表示作成
    function appendGrandchidrenBox(insertHTML){
      var grandchildSelectHtml = '';
      grandchildSelectHtml = `<div class='listing-select-wrapper__added' id= 'grandchildren_wrapper'>
                                <div class='listing-select-wrapper__box'>
                                  <select class="listing-select-wrapper__box--select" id="grandchild_category" name="item[category_id]" required>
                                    <option value="---" data-category="---">---</option>
                                    ${insertHTML}
                                  </select>
                                </div>
                              </div>`;
      $('.listing-item-detail__category').append(grandchildSelectHtml);
    }
    // 親カテゴリー選択後のイベント
    $('#parent_category').on('change', function(){
      var parentCategory = document.getElementById('parent_category').value; //選択された親カテゴリーの名前を取得
      console.log(parentCategory)
      var itemId = $('.hiddenid').data('id');
      if (parentCategory != 0){ //親カテゴリーが初期値でないことを確認
        $.ajax({
          url: '/items/' + itemId + '/get_category_children',
          type: 'GET',
          data: { parent_id: parentCategory },
          dataType: 'json'
        })
        .done(function(children){
          $('#children_wrapper').remove(); //親が変更された時、子以下を削除するする
          $('#grandchildren_wrapper').remove();
          $('#chi').remove();
          $('#gra').remove();
          var insertHTML = '';
          children.forEach(function(child){
            insertHTML += appendOption(child);
          });
          appendChidrenBox(insertHTML);
        })
        .fail(function(){
          alert('カテゴリー取得に失敗しました');
        })
      }else{
        $('#children_wrapper').remove(); //親カテゴリーが初期値になった時、子以下を削除するする
        $('#grandchildren_wrapper').remove();
      }
    });
    // 子カテゴリー選択後のイベント
    $('.listing-item-detail__category').on('change', '#child_category', function(){
      $('#grandchildren_wrapper').remove();
      var childId = $('#child_category')[0].value; //選択された子カテゴリーのidを取得
      var itemId = $('.hiddenid').data('id');
      if (childId != "---"){ //子カテゴリーが初期値でないことを確認
        $.ajax({
          url: '/items/'+ itemId +'/get_category_grandchildren',
          type: 'GET',
          data: { child_id: childId },
          dataType: 'json'
        })
        .done(function(grandchildren){
          if (grandchildren.length != 0) {
            $('#grandchildren_wrapper').remove(); //子が変更された時、孫以下を削除するする
            $('#gra').remove();
            var insertHTML = '';
            grandchildren.forEach(function(grandchild){
              insertHTML += appendOption(grandchild);
            });
            appendGrandchidrenBox(insertHTML);
          }
        })
        .fail(function(){
          alert('カテゴリー取得に失敗しました');
        })
      }else{
        $('#grandchildren_wrapper').remove(); //子カテゴリーが初期値になった時、孫以下を削除する
      }
    });
  });
});