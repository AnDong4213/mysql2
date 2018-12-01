//  c:\back.bmp
// Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
-- or
CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
-- then
FLUSH PRIVILEGES;

// 修改MYSQL初始密码
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456' PASSWORD EXPIRE NEVER;
之后使用以下指令刷新权限：flush privileges;    注意指令末尾的分号。

// 登录 MySQL
mysql -h 主机名 -u 用户名 -p
参数说明：
-h : 指定客户端所要登录的 MySQL 主机名, 登录本机(localhost 或 127.0.0。1)该参数可以省略;
-u : 登录的用户名;
-p : 告诉服务器将会使用一个密码来登录, 如果所要登录的用户名密码为空, 可以忽略此选项。
 
// MySQL 用户设置  如果你需要添加 MySQL 用户，你只需要在 mysql 数据库中的 user 表添加新用户即可。
// 添加具有本地(localhost/127.0.0.1)访问权限的用户
create user 'zad'@'localhost' identified by '123456';
// 删除用户
DELETE FROM user WHERE User="test" and Host="localhost";
flush privileges;
drop database testDB;
// 还可以
CREATE USER username IDENTIFIED BY 'password';
// 删除账户及权限：
DROP USER username;
drop user 用户名@’%’;
drop user 用户名@'localhost';

// create user  test@'localhost' identified  by '123456'; #本地登录
// create user  test@'%'  identified  by '1234'; #远程登录
 
// 为新用户分配本地权限，可以指定数据库dbname和表名，可以用*替指所有
grant all privileges on testDB.* to test@'localhost' identified by  '123456';
flush privileges; #刷新系统权限表

grant all privileges on zhangsanDb.* to zhangsan@'%' identified by 'zhangsan';
grant select,delete,update,create,drop on *.* to test@'%'; // ”%” 表示对所有非本地主机授权，不包括localhost
// grant all privileges on testdb to test@'localhost';  这个不报错...
// revoke all privileges on testdb from test@'localhost';
// FLUSH PRIVILEGES;    flush privileges;

查看 MySQL 用户权限  查看当前用户（自己）权限：  show grants;
查看其他 MySQL 用户权限：  show grants for dba@localhost;

撤销已经赋予给 MySQL 用户权限的权限。 revoke 跟 grant 的语法差不多，只需要把关键字 to 换成 from 即可：
grant all on *.* to dba@localhost;
revoke all on *.* from dba@localhost;
//  grant, revoke 用户权限后，该用户只有重新连接 MySQL 数据库，权限才能生效。
// //  注意：创建完成后需要执行 FLUSH PRIVILEGES 语句。

修改指定用户密码
mysql -u root -p
update mysql.user set authentication_string=password('新密码') where user='test' and  host='localhost';
flush privileges;

SELECT host, user, authentication_string FROM user WHERE user = 'test';
SELECT Host, User, authentication_string from user;

SHOW COLUMNS FROM 数据表:
显示数据表的属性，属性类型，主键信息 ，是否为 NULL，默认值等其他信息。  SHOW COLUMNS FROM runoob_tbl;
// SHOW INDEX FROM 数据表:
显示数据表的详细索引信息，包括PRIMARY KEY（主键）。
// SHOW TABLE STATUS LIKE [FROM db_name] [LIKE 'pattern'] \G:
该命令将输出Mysql数据库管理系统的性能及统计信息。
// mysql> SHOW TABLE STATUS  FROM RUNOOB;   # 显示数据库 RUNOOB 中所有表的信息
mysql> SHOW TABLE STATUS from RUNOOB LIKE 'runoob%';     # 表名以runoob开头的表的信息
mysql> SHOW TABLE STATUS from RUNOOB LIKE 'runoob%'\G;   # 加上 \G，查询结果按列打印
 
 
// <!-- --------------------------------------------------------------------------------------------- -->
// MySQL 创建数据库  CREATE DATABASE 数据库名;  // 貌似只有root下能建库

MySQL 删除数据库  drop database <数据库名>;

// MySQL 创建数据表    CREATE TABLE table_name (column_name column_type);
 CREATE TABLE runoob_tbl(
   -> runoob_id INT NOT NULL AUTO_INCREMENT,
   -> runoob_title VARCHAR(100) NOT NULL,
   -> runoob_author VARCHAR(40) NOT NULL,
   -> submission_date DATE,
   -> PRIMARY KEY ( runoob_id )
   -> )ENGINE=InnoDB DEFAULT CHARSET=utf8;
   
// MySQL 删除数据表    DROP TABLE table_name ;
1、当你不再需要该表时， 用 drop;
2、当你仍要保留该表，但要删除所有记录时， 用 truncate;    // truncate table 表名;
3、当你要删除部分记录时， 用 delete。// delete from 表名 where 删除条件;
3、delete from table_name : 删除表全部数据，表结构不变，对于 MyISAM 会立刻释放磁盘空间，InnoDB 不会释放磁盘空间;
5、delete 操作以后，使用 optimize table table_name 会立刻释放磁盘空间，不管是 innodb 还是 myisam;
6、delete from 表以后虽然未释放磁盘空间，但是下次插入数据的时候，仍然可以使用这部分空间。

// MySQL 插入数据
INSERT INTO table_name ( field1, field2,...fieldN )
VALUES
( value1, value2,...valueN );
// INSERT INTO table_name  (field1, field2,...fieldN)  VALUES  (valueA1,valueA2,...valueAN),(valueB1,valueB2,...valueBN),(valueC1,valueC2,...valueCN)......;
添加数据的时候可以规定列进行添加。  如果所有的列都要添加数据可以不规定列进行添加数据：
// INSERT INTO runoob_tbl
    -> VALUES
    -> ("JAVA 教程", "RUNOOB.COM", '2016-05-06'); 
	
// MySQL 查询数据
SELECT column_name,column_name
FROM table_name
[WHERE Clause]
[LIMIT N][ OFFSET M]
// 查询语句中你可以使用一个或者多个表，表之间使用逗号(,)分割，并使用WHERE语句来设定查询条件。
   SELECT 命令可以读取一条或者多条记录。
   可以使用星号（*）来代替其他字段，SELECT语句会返回表的所有字段数据
   可以使用 WHERE 语句来包含任何条件。
   可以使用 LIMIT 属性来设定返回的记录数。
   可以通过OFFSET指定SELECT语句开始查询的数据偏移量。默认情况下偏移量为0。
   
   // select * : 返回所有记录
   limit N : 返回 N 条记录
   offset M : 跳过 M 条记录, 默认 M=0, 单独使用似乎不起作用
   limit N,M : 相当于 offset N limit M , 从第 N 条记录开始, 返回 M 条记录  // 不包括第N条...
   
// select _column,_column from _table [where Clause] [limit N][offset M]
实现分页：
select * from _table limit (page_number-1)*lines_perpage, lines_perpage
或   select * from _table limit lines_perpage offset (page_number-1)*lines_perpage
// 为了检索从某一个偏移量到记录集的结束所有的记录行，可以指定第二个参数为 -1：(貌似mysql8.0不支持哎.........)
mysql> SELECT * FROM table LIMIT 95,-1; // 检索记录行 96-last.   
//如果只给定一个参数，它表示返回最大的记录行数目：    
mysql> SELECT * FROM table LIMIT 5; //检索前 5 个记录行   换句话说，LIMIT n 等价于 LIMIT 0,n。
// SELECT * from websites where name like "java%"; /* 模糊查询表下数据  以java开头的数据  */

// MySQL WHERE 子句
WHERE 子句也可以运用于 SQL 的 DELETE 或者 UPDATE 命令。
WHERE 子句类似于程序语言中的 if 条件，根据 MySQL 表中的字段值来读取指定的数据。
MySQL 的 WHERE 子句的字符串比较是不区分大小写的。 你可以使用 BINARY 关键字来设定 WHERE 子句的字符串比较是区分大小写的。
// SELECT * from runoob_tbl WHERE BINARY runoob_author='RUNOOB.COM';

// MySQL UPDATE    如果需要修改或更新 MySQL 中的数据，我们可以使用 SQL UPDATE 命令来操作。
UPDATE table_name SET field1=new-value1, field2=new-value2 [WHERE Clause]
// UPDATE runoob_tbl SET runoob_title='学习 C++' WHERE runoob_id=3;
你可以同时更新一个或多个字段..你可以在 WHERE 子句中指定任何条件..你可以在一个单独表中同时更新数据。
// 当我们需要将字段中的特定字符串批量修改为其他字符串时，可已使用以下操作：
UPDATE table_name SET field=REPLACE(field, 'old-string', 'new-string') [WHERE Clause]
// UPDATE testdb_a SET a_title = REPLACE(a_title, 'JAVA', 'Python') where a_id = 3;
UPDATE testdb_a SET a_title = REPLACE(a_title, 'JAVA', 'Python');
update students set age=age+1;

// MySQL DELETE 语句     你可以使用 SQL 的 DELETE FROM 命令来删除 MySQL 数据表中的记录
delete from 表名称 where 删除条件;
delete 操作以后，使用 optimize table table_name 会立刻释放磁盘空间，不管是 innodb 还是 myisam;
// delete from testdb_a where a_id=1;
delete，drop，truncate 都有删除表的作用，区别在于：

//  MySQL LIKE 子句
需要获取 runoob_author 字段含有 "COM" 字符的所有记录，这时我们就需要在 WHERE 子句中使用 SQL LIKE 子句。
SQL LIKE 子句中使用百分号 %字符来表示任意字符，类似于UNIX或正则表达式中的星号 *。
如果没有使用百分号 %, LIKE 子句与等号 = 的效果是一样的。 
// 将 runoob_tbl 表中获取 runoob_author 字段中以 COM 为结尾的的所有记录：
mysql> SELECT * from runoob_tbl  WHERE runoob_author LIKE '%COM';
like 匹配/模糊匹配，会与 % 和 _ 结合使用。
'%a'     //以a结尾的数据
'a%'     //以a开头的数据
'%a%'    //含有a的数据
'_a_'    //三位且中间字母是a的
'_a'     //两位且结尾字母是a的
'a_'     //两位且开头字母是a的

// MySQL UNION 操作符
MySQL UNION 操作符用于连接两个以上的 SELECT 语句的结果组合到一个结果集合中。多个 SELECT 语句会删除重复的数据。
SELECT expression1, expression2, ... expression_n FROM tables [WHERE conditions]
UNION [ALL | DISTINCT]
SELECT expression1, expression2, ... expression_n FROM tables [WHERE conditions];
/* expression1, expression2, ... expression_n: 要检索的列。
tables: 要检索的数据表。
WHERE conditions: 可选， 检索条件。
DISTINCT: 可选，删除结果集中重复的数据。默认情况下 UNION 操作符已经删除了重复数据，所以 DISTINCT 修饰符对结果没啥影响。
ALL: 可选，返回所有结果集，包含重复数据。 */
从 "Websites" 和 "apps" 表中选取所有不同的country（只有不同的值）：
select country from websites union select country from apps order by country;
// 也有重复的值   select country from websites union all select country from apps order by country;
SELECT 列名称 FROM 表名称 UNION SELECT 列名称 FROM 表名称 ORDER BY 列名称；
SELECT 列名称 FROM 表名称 UNION ALL SELECT 列名称 FROM 表名称 ORDER BY 列名称；

// MySQL 排序
// 需要对读取的数据进行排序，就可以使用 MySQL 的 ORDER BY 子句来设定你想按哪个字段哪种方式来进行排序，再返回搜索结果
可以使用 ASC 或 DESC 关键字来设置查询结果是按升序或降序排列。 可以添加 WHERE...LIKE 子句设置条件。
// 默认情况下，它是按升序排列。SELECT * from runoob_tbl ORDER BY submission_date;(ASC)

0.导出数据库  不需要连接数据库，直接切换至mysqld.exe所在目录(bin目录)后 // mysqldump -u root -p testdb apps > testdb_apps.sql
1.导入数据库  mysql>use 数据库名  mysql>source d:/mysql2/employee.sql

// MySQL GROUP BY 语句
GROUP BY 语句根据一个或多个列对结果集进行分组。  在分组的列上我们可以使用 COUNT, SUM, AVG,等函数。 
SELECT column_name, function(column_name) FROM table_name
WHERE column_name operator value GROUP BY column_name
// 使用 GROUP BY 语句 将数据表按名字进行分组，并统计每个人有多少条记录：
SELECT name, COUNT(*) FROM employee_tbl GROUP BY name;
select name, count(*) as haha from employee_tbl group by name;
// 使用 WITH ROLLUP   WITH ROLLUP 可以实现在分组统计数据基础上再进行相同的统计（SUM,AVG,COUNT…）。
按名字进行分组，再统计每个人登录的次数：
select name,sum(singin) as hehe from employee_tbl group by name with rollup;
// 可以使用 coalesce 来设置一个可以取代 NUll 的名称，coalesce 语法：  select coalesce(a,b,c);
如果a==null,则选择b；如果b==null,则选择c；如果a!=null,则选择a；如果a b c 都为null ，则返回为null（没意义）。
SELECT coalesce(name, '总数'), SUM(singin) as hehe FROM  employee_tbl GROUP BY name WITH ROLLUP;
// group by 可以实现一个最简单的去重查询，除了用 distinct,还可以用：
SELECT name FROM employee_tbl GROUP BY name;
// 分组后的条件使用 HAVING 来限定，WHERE 是对原始数据进行条件限制。几个关键字的使用顺序为 where 、group by 、having、order by 














 
 
INSERT INTO testdb_a (a_title, a_author, a_data ) VALUES ("JAVA教程4","RUNOOB.COM_4",'2016-05-06'),("JAVA教程5","RUNOOB.COM_5",'2016-05-06'),("JAVA教程6","RUNOOB.COM_6",'2016-05-06'),("JAVA教程7","RUNOOB.COM_7",'2016-05-06'),("JAVA教程8","RUNOOB.COM_8",'2016-05-06'),("JAVA教程9","RUNOOB.COM_9",'2016-05-06'),("JAVA教程10","RUNOOB.COM_10",'2016-05-06'),("JAVA教程11","RUNOOB.COM_11",'2016-05-06');
('Google', 'https://www.google.cm/', 1, 'USA'),
('淘宝', 'https://www.taobao.cm/', 12, 'CN'),('菜鸟教程', 'https://www.runoob.cm/', 4689, 'JPN'),
('微博', 'https://www.weibo.cm/', 20, 'CN'),('Facebook', 'https://www.facebook.cm/', 3, 'USA'),
('stackoverflow', 'https://www.stackoverflow.cm/', 5, 'IND'),('twitter', 'https://www.twitter.cm/', 6, 'USA');

('QQ APP','http://im.qq.com/','CN',2),('微博 APP','http://weibo.com/','CN',3),
('淘宝 APP','https://www.taobao.com/','CN',4),('IPHONE STORE','https://www.iphone.com/','USA',5);
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 