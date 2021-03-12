var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var dbconfig = require('../config/database')
var connection = mysql.createConnection(dbconfig);
var moment = require('moment');

/* GET home page. */
router.get('/', function (req, res, next) { // index 페이지

  msg = req.session.user_id


  // if(msg){
  // connection.query('SELECT Keyword,num FROM member WHERE id = ?', [msg], function (error, result1) {

  //   connection.query('SELECT Title,PostNo FROM post WHERE postNo > ? ORDER BY PostNo', [result1[0].num], function (err, result) {

  //     for (var i = 0; i < result.length; i++) {
  //       dat = result[i];
  //       console.log(dat);


  //       connection.query(`SELECT COUNT(*) AS No FROM member WHERE id = ? AND Keyword LIKE '%${result[i].Title}%'`,[msg], function (e, result3) {

  //         if (result3[0].No == 1) {

  //           connection.query('INSERT INTO message(Id,Mes,PostNo) VALUES (?,?,?)', [msg, "등록하신 키워드인" + dat.Title + " 가 등록되었습니다", dat.PostNo]);
  // console.log(7);

  //           connection.query('UPDATE member SET num = ? WHERE Id = ?', [dat.PostNo, msg])
  // console.log(8);

  //         }
  //       })
  //     }
  //   });
  // })
  // }

  // connection.query('SELECT * FROM products', function (err, data) {
  //   res.render('index', {
  //     data: data,
  //     msg: msg
  //   });
  // })

  res.render('index', {

  });
})

router.get('/main2', function (req, res, next) { // index2 페이지

  res.render('main2');
});

router.get('/keywordinsert2', function (req, res) {
  msg = req.session.user_id
  connection.query(`SELECT * FROM keyword WHERE Id = "${msg}"`, function (err,result) {
    res.render('keywordinsert2', {
      data: result
    })
  })
})
router.get('/join', function (req, res, next) {
  res.render('join');
});

router.post('/join', function (req, res) {
  var body = req.body;

  connection.query('INSERT INTO user(ID,Password,Name,Email,test) VALUES (?,?,?,?,?)', [body.ID, body.Password, body.Name, body.Email, body.test],

    function (err, data) {
      res.send('<script>alert("회원가입 완료"); location.href="/";</script>');
    });
});

router.get('/keyword1', function (req, res) { //키워드검색
  msg = req.session.user_id
  var getdata = req.query;
  connection.query(`SELECT * FROM post WHERE Title LIKE "%창훈%"`, function (err, result) {
    console.log(result)
    res.render('keyword1', {
      data: result
    });
  })

})

router.get('/keyword2', function (req, res) { //키워드검색
  msg = req.session.user_id
  var getdata = req.query;
  connection.query(`SELECT * FROM post WHERE Title LIKE "%a%"`, function (err, result) {
    console.log(result)
    res.render('keyword2', {
      data: result
    });
  })

})

router.get('/keyword3', function (req, res) { //키워드검색
  msg = req.session.user_id
  var getdata = req.query;
  connection.query(`SELECT * FROM post WHERE Title LIKE "%시훈%"`, function (err, result) {
    console.log(result)
    res.render('keyword3', {
      data: result
    });
  })

})

router.get('/keyword4', function (req, res) { //키워드검색
  msg = req.session.user_id
  var getdata = req.query;
  connection.query(`SELECT * FROM post WHERE Title LIKE "%세영%"`, function (err, result) {
    console.log(result)
    res.render('keyword4', {
      data: result
    });
  })

})

router.get('/keyword5', function (req, res) { //키워드검색
  msg = req.session.user_id
  var getdata = req.query;
  connection.query(`SELECT * FROM post WHERE Title LIKE "%노드%"`, function (err, result) {
    console.log(result)
    res.render('keyword5', {
      data: result
    });
  })

})

router.get('/login', function (req, res, next) { // index 페이지

  res.render('login');
});

router.post('/login', function (req, res) {
  var id = req.body.id;
  var pw = req.body.Password;

  connection.query(`SELECT count(*) cnt from member where Id='${id}' and Pwd='${pw}'`, function (err, rows) {
    if (err) console.error('err', err);
    console.log('rows', rows);
    var cnt = rows[0].cnt;
    if (cnt == 1) {
      req.session.user_id = id;
      console.log('jtgjgn')
      res.send('<script> alert("로그인이 완료되었습니다"); location.href="/main2"; </script>')
    } else {
      res.send('<script>alert("아이디나 비밀번호가 틀려서 되돌아갑니다!");history.back();</script>');
    }
  })
})

router.get('/signup', function (req, res, next) { // index 페이지

  res.render('signup');
});

router.post('/signup', function (req, res) {
  var body = req.body

  if (body.id == "") {
    res.send('<script>alert("아이디가 입력되지 않았습니다");history.back();</script>');
  } else if (body.password == "" || body.password2 == "") {
    res.send('<script>alert("비밀번호가 입력되지 않았습니다");history.back();</script>');
  } else if (body.name == "") {
    res.send('<script>alert("이름이 입력되지 않았습니다");history.back();</script>');
  } else if (body.tel == "") {
    res.send('<script>alert("전화번호가 입력되지 않았습니다");history.back();</script>');
  } else if (body.email == "") {
    res.send('<script>alert("이메일이 입력되지 않았습니다");history.back();</script>');
  } else if (body.password != body.password2) {
    res.send('<script>alert("패스워드가 불일치합니다");history.back();</script>');
  } else {
    connection.query('INSERT INTO member (Id, Pwd, Name, Tel, Email, Grade, Keyword) VALUES(?,?,?,?,?,?,?)', [body.id, body.password, body.name, body.telNum, body.email, "일반회원", "0"], function (err, result) {
      if (err) {
        console.error(err, "err");
      } else if (result) {
        res.send('<script>alert("회원가입이 완료되었습니다");location.href="/";</script>');
      }
    }
    )
  }
})




router.get('/logout', function (req, res) {

  req.session.destroy(function (err) {
    if (err) console.error('err', err);
    res.send('<script>alert("로그아웃 되었습니다!");location.href="/";</script>');
  })
})

router.get('/insert', function (req, res) {
  msg = req.session.user_id
  res.render('insert')
})

router.get('/test1', function (req, res) {
  msg = req.session.user_id
  res.render('test1')
})

router.get('/test2', function (req, res) {
  msg = req.session.user_id
  res.render('test2')
})

router.get('/test3', function (req, res) {
  msg = req.session.user_id
  res.render('test3')
})

router.get('/test4', function (req, res) {
  msg = req.session.user_id
  res.render('test4')
})

router.get('/test5', function (req, res) {
  msg = req.session.user_id
  res.render('test5')
})

router.get('/test6', function (req, res) {
  msg = req.session.user_id
  res.render('test6')
})

router.get('/test7', function (req, res) {
  msg = req.session.user_id
  res.render('test7')
})

router.get('/test8', function (req, res) {
  msg = req.session.user_id
  res.render('test8')
})

router.post('/insert', function (req, res) {

  msg = req.session.user_id
  var body = req.body
  var date = moment().format("YYYY-MM-DD").toString();
  if (body.title == "") {
    res.send('<script>alert("작성이 완료되지 않았습니다 "); history.back();</script>')
  } else {
    connection.query('INSERT INTO post(Id,PostType,Date,Content,Title) VALUES (?,?,?,?,?)', [msg, "중고거래", date, body.content, body.Title], function (err, data) {

      if (err) {
        console.error(err, "err");
      } else if (data) {
        res.send('<script>alert("게시글작성이 완료되었습니다!"); location.href="/";</script>');
      };
    })
  }
})

router.get('/keywordinsert', function (req, res) {
  msg = req.session.user_id
  connection.query(`SELECT * FROM keyword WHERE Id = "${msg}"`, function (err,result) {
    res.render('keywordinsert', {
      data: result
    })
  })
})

router.post('/keywordinsert', function (req, res) {

  msg = req.session.user_id
  var body = req.body
  // var date = moment().format("YYYY-MM-DD").toString();
  if (body.keyword1 == "" && body.keyword2 == "" && body.keyword3 == "" && body.keyword4 == "" && body.keyword5 == "") {
    res.send('<script>alert("하나 이상 입력해주십시오 "); history.back();</script>')
    } else {
      connection.query('INSERT INTO keyword(Id,keyword1,keyword2,keyword3,keyword4,keyword5) VALUES (?,?,?,?,?,?)', [msg, body.keyword1, body.keyword2, body.keyword3, body.keyword4, body.keyword5], function (err, data) {
        if (err) {
          console.error(err, "err");
        } else if (data) {
          res.send('<script>alert("키워드 등록이 완료되었습니다!"); location.href="/main2";</script>')
        }
      })
      }
    })

//     connection.query('INSERT INTO keyword(Id,keyword1) VALUES (?,?)', [msg, body.keyword1], function (err, result1) {
//       connection.query('INSERT INTO keyword(Id,keyword1) VALUES (?,?)', [msg, body.keyword2], function (err, result2) {
//         connection.query('INSERT INTO keyword(Id,keyword1) VALUES (?,?)', [msg, body.keyword3], function (err, result3) {
//           connection.query('INSERT INTO keyword(Id,keyword1) VALUES (?,?)', [msg, body.keyword4], function (err, result4) {
//             connection.query('INSERT INTO keyword(Id,keyword1) VALUES (?,?)', [msg, body.keyword5], function (err, result5) {
//               if (err) {
//                 console.error(err, "err");
//               } else if (result5) {
//                 res.send('<script>alert("키워드 등록이 완료되었습니다!"); location.href="/main2";</script>');

//               }

//             })
//           })
//         })
//       })
//     })
//   }
// else{
//   res.send('<script>alert("빈칸을 모두 채워 작성해주십시오 "); history.back();</script>')
// }
// })

    //    connection.query(`SELECT keyword1,COUNT(*) AS num FROM keyword WHERE Id = ${msg}`,function(err,result){
    //       connection.query(`SELECT keyword1 FROM keyword WHERE = ${msg}`,function(err,result1){
    //         for(var i = 0; i< result[0].num; i++){
    //           result1[i]
    //         }
    //   })
    // })

    // router.get('/keyword', function (req, res) {
    //   msg = req.session.user_id
    //     connection.query(`SELECT * FROM keyword WHERE Id= ${msg}`,function(err,result){
    //         connection.query(`SELECT * FROM post WHERE Title LIKE "%${keyword1}%" `, function (err, result1) {
    //         })
    //         connection.query(`SELECT * FROM post WHERE Title LIKE "%${keyword2}%" `, function (err, result2) {
    //         })
    //         connection.query(`SELECT * FROM post WHERE Title LIKE "%${keyword3}%" `, function (err, result3) {
    //         })
    //         connection.query(`SELECT * FROM post WHERE Title LIKE "%${keyword4}%" `, function (err, result4) {
    //         })
    //         connection.query(`SELECT * FROM post WHERE Title LIKE "%${keyword5}%" `, function (err, result5) {
    //         })
          
    //       console.log(result1)
    //       console.log(result2)
    //       console.log(result3)
    //       console.log(result4)
    //       console.log(result5)
    //     res.render('keyword', {
    //       data: result
    //     })
    //   })
    // })
  
  
    

    router.get('/read/:PostNo', function (req, res) {
      msg = req.session.user_id
      console.log(req.params.PostNo);
      connection.query('SELECT * FROM post WHERE PostNo = ? ', [req.params.PostNo], function (err, result) {
        console.log("ㅋㅋ");
        connection.query('SELECT com FROM comment WHERE postNo = ?', [req.params.PostNo], function (er, results) {
    
          res.render('read', {
            title: "게시글 상세정보",
            msg: msg,
            data: result,
            data1: results
          })
        })
      })
    })

    router.get('/problem', function (req, res) {
      msg = req.session.user_id
      connection.query('SELECT * FROM post,member WHERE post.Id = member.Id', function (err, result) {

        res.render('problem', {
          data: result
        });
      })

    })
    

    router.post('/comment/:PostNo', function (req, res) {
      var body = req.body
      msg = req.session.user_id
    
      connection.query(`INSERT INTO comment(Id, com, postNo) VALUES ('${msg}','${body.Title}','${req.params.PostNo}')`, function (err, data) {
    
        
        if (err) {
          console.error(err, "err");
        }
        else {
          
          res.send(`<script>location.href='/read/${req.params.PostNo}'</script>`);
        }
      });
    })

    router.get('/edit', function (req, res) {
      msg = req.session.user_id
      console.log("22222222222")
      console.log(req.query.PostNo)
      if (!msg) {
        res.render('login')
      } else {
        connection.query('SELECT * FROM post WHERE PostNo = ?', [req.query.PostNo], function (err, result) {
          res.render('edit', {
            data: result
          })
        })
      }
    })

    router.post('/edit/:PostNo', function (req, res) {
      msg = req.session.user_id
      console.log("----------------")
      console.log(req.body)
      var sql = `UPDATE post SET Title = ?, content = ? WHERE PostNo = ? `
      connection.query(sql, [req.body.Title, req.body.content, req.params.PostNo], function (err, result) {
        res.send('<script> alert("수정이 완료되었습니다"); location.href="/list";</script>');
      })
    })

    router.get('/delete/:PostNo', function (req, res) {
      msg = req.session.user_id
      connection.query('DELETE FROM post WHERE PostNo = ? ', [req.params.PostNo], function (err, result) {
        res.send('<script> alert("삭제가 완료되었습니다"); location.href="/list"; </script>')
      })
    })

    router.get('/list', function (req, res) {
      msg = req.session.user_id
      connection.query('SELECT * FROM post,member WHERE post.Id = member.Id', function (err, result) {

        res.render('list', {
          data: result
        });
      })

    })



    module.exports = router;