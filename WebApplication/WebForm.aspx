<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm.aspx.cs" Inherits="WebApplication.WebForm" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <!-- JQuery -->
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.js"></script>

</head>
<body>
    <form id="form1" runat="server" style="height: 150px">      
        <div id="Main">
            <div id="Left" style="float:left; width:49%">                
                <asp:ListBox ID="ListBox1" runat="server" Height="100%" Width="100%" Style="margin-bottom: 0px; float: left" />
            </div>
            <div id="Right" style="float:right; width:49%">
                <asp:GridView ID="GridView1" runat="server" Height="100%" Width="100%" style="float:right"/>
            </div>         
        </div>  
        
        <div id="Bottom">
            <asp:PlaceHolder ID="PlaceHolder1" runat="server"></asp:PlaceHolder>
        </div> 
        <asp:DataList ID="DataList1" runat="server" Width="206px">
            <ItemTemplate>
                <img src="<%#Eval("url") %>" id="<%#Eval("id") %>" onclick="SwapOccupancy(this.src, this.id)"/>
            </ItemTemplate>
        </asp:DataList>
        <canvas id="canvasID">

        </canvas>
    </form>
       
        
    <!-- Custom JS -->
    <script src="JavaScript.js"></script>
</body>
</html>
