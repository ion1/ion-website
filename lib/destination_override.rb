class Webby::Resources::Page
  # Originals in lib/webby/resources/page.rb

  def destination
    return @destination unless @destination.nil?

    @destination = ::File.join(::Webby.site.output_dir, directory, filename)

    ext = extension

    if ext == 'html' and filename != 'index'
      @destination = ::File.join(@destination, 'index')
    end

    unless ext.nil? or ext.empty?
      @destination << '.' << ext
    end

    @destination
  end

  def url
    return @url unless @url.nil?

    @url = super
    @url.sub! %r{/index\.html$}, '/'
    @url
  end
end
