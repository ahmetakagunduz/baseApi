class Response {
  constructor(data=null, message = null) {
    this.data = data;
    this.message = message;
    
  }

  success(res) {
    return res.status(this.status || 200).json({
      success: true,
      data: this.data,
      message: this.message ?? "Success",
    });
  }

  created(res) {
    return res.status(this.status || 201).json({
      success: true,
      data: this.data,
      message: this.message ?? "Created",
    });
  }

  
    error500(res) {
        return res.status(500).json({
        success: false,
        message: this.message ?? "Internal Server Error",
        });
    }
    error400(res) {
        return res.status(400).json({
        success: false,
        message: this.message ?? "Bad Request",
        });
    }
    error401(res) {
        return res.status(401).json({
        success: false,
        message: this.message ?? "Unauthorized",
        });
    }
    error404(res) {
        return res.status(404).json({
            success: false,
            message: this.message ?? "Not Found"
        })
    }
    error429(res) {
        return res.status(429).json({
            success: false,
            message: this.message ?? "Too many requests"
        })
    }
    

    

}
module.exports = Response;