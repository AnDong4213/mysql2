//  c:\back.bmp            Structured  Query  Language   SQL
// http://www.runoob.com/w3cnote/es6-tutorial.html
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
drop database testDB;          //      (  创建数据库到授权其他用户要一气呵成.....................  )
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

查看 MySQL 用户权限 查看当前用户（自己）权限：  show grants;   /* ----------------------------- */
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
 
 
// <!-- ------------------------------------------------------------------------------------------------------------------ -->
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
添加数据的时候可以规定列进行添加。如果所有的列都要添加数据可以不规定列进行添加数据：
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


// Mysql 连接的使用   在真正的应用中经常需要从多个数据表中读取数据..........................
// 可以在 SELECT, UPDATE 和 DELETE 语句中使用 Mysql 的 JOIN 来联合多表查询。
INNER JOIN（内连接,或等值连接）：获取两个表中字段匹配关系的记录。
LEFT JOIN（左连接）：获取左表所有记录，即使右表没有对应匹配的记录。
RIGHT JOIN（右连接）： 与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录。
// 使用MySQL的INNER JOIN(也可以省略 INNER 使用 JOIN，效果一样)来连接以上两张表来读取runoob_tbl表中所有runoob_author字段在tcount_tbl表对应的runoob_count字段值：
select a.runoob_id,a.runoob_author,b.runoob_count from runoob_tbl a
inner join tcount_tbl b
on a.runoob_author=b.runoob_author;
// select a.runoob_id,a.runoob_author,b.runoob_count from runoob_tbl a inner join tcount_tbl b on a.runoob_author=b.runoob_author;
// 以上 SQL 语句等价于：
SELECT a.runoob_id,a.runoob_author,b.runoob_count from runoob_tbl a, tcount_tbl b WHERE
a.runoob_author = b.runoob_author;
// MySQL LEFT JOIN    会读取左边数据表的全部数据，即便右边表无对应数据。
SELECT a.runoob_id, a.runoob_author, b.runoob_count FROM runoob_tbl a LEFT JOIN tcount_tbl b ON a.runoob_author = b.runoob_author
// MySQL RIGHT JOIN 会读取右边数据表的全部数据，即便左边边表无对应数据。
SELECT a.runoob_id, a.runoob_author, b.runoob_count FROM runoob_tbl a RIGHT JOIN tcount_tbl b ON a.runoob_author = b.runoob_author;


//  MySQL NULL 值处理
MySQL 使用 SQL SELECT 命令及 WHERE 子句来读取数据表中的数据,但是当提供的查询条件字段为 NULL 时，该命令可能就无法正常工作。
// 为了处理这种情况，MySQL提供了三大运算符:
    IS NULL: 当列的值是 NULL,此运算符返回 true。
    IS NOT NULL: 当列的值不为 NULL, 运算符返回 true。
    <=>: 比较操作符（不同于=运算符），当比较的的两个值为 NULL 时返回 true。
关于 NULL 的条件比较运算是比较特殊的。你不能使用 = NULL 或 != NULL 在列中查找 NULL 值 。
在 MySQL 中，NULL 值与任何其它值的比较（即使是 NULL）永远返回 false，即 NULL = NULL 返回false 。
MySQL 中处理 NULL 使用 IS NULL 和 IS NOT NULL 运算符。
// 可以看到 = 和 != 运算符是不起作用的：
SELECT * FROM runoob_test_tbl WHERE runoob_count = NULL;  // != NULL;
// 查找数据表中 runoob_test_tbl 列是否为 NULL，必须使用 IS NULL 和 IS NOT NULL
SELECT * FROM runoob_test_tbl WHERE runoob_count IS NULL;
SELECT * from runoob_test_tbl WHERE runoob_count IS NOT NULL;


// MySQL 正则表达式
了解到MySQL可以通过 LIKE ...% 来进行模糊匹配。
MySQL 同样也支持其他正则表达式的匹配， MySQL中使用 REGEXP 操作符来进行正则表达式匹配。
// 查找name字段中以'st'为开头的所有数据：
mysql> SELECT name FROM person_tbl WHERE name REGEXP '^st';


// MySQL 事务
 MySQL 事务主要用于处理操作量大，复杂度高的数据。比如说，在人员管理系统中，你删除一个人员，你即需要删除人员的基本资料，也要删除和该人员相关的信息，如信箱，文章等等，这样，这些数据库操作语句就构成一个事务！
    在 MySQL 中只有使用了 Innodb 数据库引擎的数据库或表才支持事务。
    事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行。
    事务用来管理 insert,update,delete 语句
一般来说，事务是必须满足4个条件（ACID）：原子性（Atomicity，或称不可分割性）、一致性（Consistency）、隔离性（Isolation，又称独立性）、持久性（Durability）。 
// 在 MySQL 命令行的默认设置下，事务都是自动提交的，即执行 SQL 语句后就会马上执行 COMMIT 操作。因此要显式地开启一个事务务须使用命令 BEGIN 或 START TRANSACTION，或者执行命令 SET AUTOCOMMIT=0，用来禁止使用当前会话的自动提交。


// MySQL ALTER命令
需要修改数据表名或者修改数据表字段时，就需要使用到MySQL ALTER命令(alter)
// 使用了 ALTER 命令及 DROP 子句来删除以上创建表的 i 字段：
mysql> ALTER TABLE testalter_tbl  DROP i;
如果数据表中只剩余一个字段则无法使用DROP来删除字段。
// MySQL 中使用 ADD 子句来向数据表中添加列，如下实例在表 testalter_tbl 中添加 i 字段，并定义数据类型:
mysql> ALTER TABLE testalter_tbl ADD i INT; (i 字段会自动添加到数据表字段的末尾。)
// 如果你需要指定新增字段的位置，可以使用MySQL提供的关键字 FIRST (设定位第一列)， AFTER 字段名（设定位于某个字段之后）。
ALTER TABLE testalter_tbl ADD i INT FIRST;
ALTER TABLE testalter_tbl ADD i INT AFTER c;
// 修改字段类型及名称
如果需要修改字段类型及名称, 你可以在ALTER命令中使用 MODIFY 或 CHANGE 子句 。
把字段 c 的类型从 CHAR(1) 改为 CHAR(10)     ALTER TABLE testalter_tbl MODIFY c CHAR(10);
// 使用 CHANGE 子句, 语法有很大的不同。 在 CHANGE 关键字之后，紧跟着的是你要修改的字段名，然后指定新字段名及类型。
ALTER TABLE testalter_tbl CHANGE i j BIGINT;
ALTER TABLE testalter_tbl CHANGE j j INT;
// ALTER TABLE 对 Null 值和默认值的影响   修改字段时，你可以指定是否包含值或者是否设置默认值
指定字段 j 为 NOT NULL 且默认值为100 。 
alter table testalter_tbl modify j bigint not null default 100;
如果不设置默认值，MySQL会自动设置该字段默认为 NULL。
// 修改字段默认值  ALTER TABLE testalter_tbl ALTER i SET DEFAULT 1000;
可以使用 ALTER 命令及 DROP子句来删除字段的默认值  ALTER TABLE testalter_tbl ALTER i DROP DEFAULT;
// 修改数据表类型，可以使用 ALTER 命令及 TYPE 子句来完成。将表 testalter_tbl 的类型修改为 MYISAM ：
ALTER TABLE testalter_tbl ENGINE = MYISAM;
查看数据表类型     show table status like 'testalter_tbl'\G;    // G必须大写...
// 修改表名 需要修改数据表的名称，可以在 ALTER TABLE 语句中使用 RENAME 子句来实现。
ALTER TABLE testalter_tbl RENAME TO alter_tbl;
// 删除外键约束：keyName是外键别名   alter table tableName drop foreign key keyName;
修改字段的相对位置：这里name1为想要修改的字段，type1为该字段原来类型(可以改变类型)，first和after二选一，这应该显而易见，first放在第一位，after放在name2字段后面
alter table testalter_tbl modify z int first;
alter table testalter_tbl modify z int after j;


// MySQL 索引
MySQL索引的建立对于MySQL的高效运行是很重要的，索引可以大大提高MySQL的检索速度。
索引分单列索引和组合索引。单列索引，即一个索引只包含单个列，一个表可以有多个单列索引，但这不是组合索引。组合索引，即一个索引包含多个列。
创建索引时，你需要确保该索引是应用在 SQL 查询语句的条件(一般作为 WHERE 子句的条件)。
实际上，索引也是一张表，该表保存了主键与索引字段，并指向实体表的记录。
上面都在说使用索引的好处，但过多的使用索引将会造成滥用。因此索引也会有它的缺点：虽然索引大大提高了查询速度，同时却会降低更新表的速度，如对表进行INSERT、UPDATE和DELETE。因为更新表时，MySQL不仅要保存数据，还要保存一下索引文件。
建立索引会占用磁盘空间的索引文件。 
// 创建索引  这是最基本的索引，它没有任何限制。
CREATE INDEX indexName ON mytable(username(length)); 


// MySQL 临时表
MySQL 临时表在我们需要保存一些临时数据时是非常有用的。临时表只在当前连接可见，当关闭连接时，Mysql会自动删除表并释放所有空间。
CREATE TEMPORARY TABLE SalesSummary(和创建正常表一样...)
// 当你使用 SHOW TABLES命令显示数据表列表时，你将无法看到 SalesSummary表。如果你退出当前MySQL会话，再使用 SELECT命令来读取原先创建的临时表数据，那你会发现数据库中没有该表的存在，因为在你退出时该临时表已经被销毁了。
删除MySQL 临时表,默认情况下，当你断开与数据库的连接后，临时表就会自动被销毁。当然你也可以在当前MySQL会话使用 DROP TABLE 命令来手动删除临时表            DROP TABLE SalesSummary;


// MySQL 复制表
使用 SHOW CREATE TABLE 命令获取创建数据表(CREATE TABLE) 语句，该语句包含了原数据表的结构，索引等。
复制以下命令显示的SQL语句，修改数据表名，并执行SQL语句，通过以上命令 将完全的复制数据表结构。
如果你想复制表的内容，你就可以使用 INSERT INTO ... SELECT 语句来实现。
//步骤一： 获取数据表的完整结构。 SHOW CREATE TABLE runoob_tbl \G;
步骤二： 修改SQL语句的数据表名，并执行SQL语句。
mysql> CREATE TABLE `clone_tbl` (
  -> runoob_id int(11) NOT NULL auto_increment,
  -> runoob_title varchar(100) NOT NULL default '',
  -> runoob_author varchar(40) NOT NULL default '',
  -> submission_date date default NULL,
  -> PRIMARY KEY  (`runoob_id`),
  -> UNIQUE KEY `AUTHOR_INDEX` (`runoob_author`)
-> ) ENGINE=InnoDB;
// 步骤三： 执行完第二步骤后，你将在数据库中创建新的克隆表 clone_tbl。 如果你想拷贝数据表的数据你可以使用 INSERT INTO... SELECT 语句来实现。
mysql> INSERT INTO clone_tbl (runoob_id,runoob_title,runoob_author,submission_date)
    -> SELECT runoob_id,runoob_title,runoob_author,submission_date FROM runoob_tbl;
////// 另一种完整复制表的方法:
CREATE TABLE targetTable LIKE sourceTable;
INSERT INTO targetTable SELECT * FROM sourceTable;
// 可以拷贝一个表中其中的一些字段: 
create table hehetable as (select runoob_title,runoob_author from runoob_tbl);


// MySQL 元数据
SELECT VERSION( )	服务器版本信息
SELECT DATABASE( )	当前数据库名 (或者返回空)
SELECT USER( )	当前用户名
SHOW STATUS \G;	服务器状态
SHOW VARIABLES \G;	服务器配置变量
 
 
// MySQL 序列使用
MySQL 序列是一组整数：1, 2, 3, ...，由于一张数据表只能有一个字段自增主键，如果你想实现其他字段也实现自动增加，就可以使用MySQL序列来实现。
// 在MySQL的客户端中你可以使用 SQL中的LAST_INSERT_ID( ) 函数来获取最后的插入表中的自增列的值。   select last_insert_id();
 
 
// MySQL 处理重复数据
可以在MySQL数据表中设置指定的字段为 PRIMARY KEY（主键） 或者 UNIQUE（唯一） 索引来保证数据的唯一性。 
// 设置表中字段first_name，last_name数据不能重复，你可以设置双主键模式来设置数据的唯一性， 如果你设置了双主键，那么那个键的默认值不能为NULL，可设置为NOT NULL。
CREATE TABLE person_tbl
(
   first_name CHAR(20) NOT NULL,
   last_name CHAR(20) NOT NULL,
   sex CHAR(10),
   PRIMARY KEY (last_name, first_name)
);
//如果设置了唯一索引，那么在插入重复数据时，SQL语句将无法执行成功,并抛出错。
 INSERT IGNORE INTO与INSERT INTO的区别就是INSERT IGNORE会忽略数据库中已经存在的数据，如果数据库没有数据，就插入新的数据，如果有数据的话就跳过这条数据。这样就可以保留数据库中已经存在数据，达到在间隙中插入数据的目的。 
// 使用了INSERT IGNORE INTO，执行后不会出错，也不会向数据表中插入重复数据：
INSERT IGNORE INTO当插入数据时，在设置了记录的唯一性后，如果插入重复数据，将不返回错误，只以警告形式返回。 而REPLACE INTO into如果存在primary 或 unique相同的记录，则先删除掉。再插入新记录。
// 另一种设置数据的唯一性方法是添加一个UNIQUE索引
CREATE TABLE person_tbl
(
   first_name CHAR(20) NOT NULL,
   last_name CHAR(20) NOT NULL,
   sex CHAR(10),
   UNIQUE (last_name, first_name)
);
// 统计重复数据
确定/* 哪一列 */包含的值可能会重复。在列选择列表使用COUNT(*)列出的那些列。
在GROUP BY子句中列出的列。 HAVING子句设置重复数大于1。
// SELECT first, COUNT(*) as repetitions FROM person_tbl2 GROUP BY first HAVING repetitions > 1;
// SELECT first,last, COUNT(*) as repetitions FROM person_tbl2 GROUP BY first,last HAVING repetitions > 1;
过滤重复数据  需要读取不重复的数据可以在 SELECT 语句中使用 DISTINCT 关键字来过滤重复数据。
select distinct first from  person_tbl2;
// 也可以使用 GROUP BY 来读取数据表中不重复的数据：
select first from person_tbl2 group by first;
select first, count(*) as hehe from person_tbl2 group by first;
// 删除重复数据   想删除数据表中的重复数据，你可以使用以下的SQL语句：
CREATE TABLE tmp SELECT last_name, first_name, sex FROM person_tbl  GROUP BY (last_name, first_name, sex);
DROP TABLE person_tbl;
ALTER TABLE tmp RENAME TO person_tbl;
// 也可以在数据表中添加 INDEX（索引） 和 PRIMAY KEY（主键）这种简单的方法来删除表中的重复记录
ALTER IGNORE TABLE person_tbl ADD PRIMARY KEY (last_name, first_name);  (/* 貌似不行 */)


// MySQL 及 SQL 注入
如果通过网页获取用户输入的数据并将其插入一个MySQL数据库，那么就有可能发生SQL注入安全的问题。


// MySQL 导出数据
使用 SELECT ... INTO OUTFILE 语句导出数据






CREATE TABLE person_tbl2
(first CHAR(20),last CHAR(20),sex CHAR(10),age int(10));
('aa','bb','nv',14),('aa','cc','nv',12),('ff','bb','nv',15),('rr','bb','nv',17)
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
INSERT INTO testdb_a (a_title, a_author, a_data ) VALUES ("JAVA教程4","RUNOOB.COM_4",'2016-05-06'),("JAVA教程5","RUNOOB.COM_5",'2016-05-06'),("JAVA教程6","RUNOOB.COM_6",'2016-05-06'),("JAVA教程7","RUNOOB.COM_7",'2016-05-06'),("JAVA教程8","RUNOOB.COM_8",'2016-05-06'),("JAVA教程9","RUNOOB.COM_9",'2016-05-06'),("JAVA教程10","RUNOOB.COM_10",'2016-05-06'),("JAVA教程11","RUNOOB.COM_11",'2016-05-06');
('Google', 'https://www.google.cm/', 1, 'USA'),
('淘宝', 'https://www.taobao.cm/', 12, 'CN'),('菜鸟教程', 'https://www.runoob.cm/', 4689, 'JPN'),
('微博', 'https://www.weibo.cm/', 20, 'CN'),('Facebook', 'https://www.facebook.cm/', 3, 'USA'),
('stackoverflow', 'https://www.stackoverflow.cm/', 5, 'IND'),('twitter', 'https://www.twitter.cm/', 6, 'USA');

('QQ APP','http://im.qq.com/','CN',2),('微博 APP','http://weibo.com/','CN',3),
('淘宝 APP','https://www.taobao.com/','CN',4),('IPHONE STORE','https://www.iphone.com/','USA',5);
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 